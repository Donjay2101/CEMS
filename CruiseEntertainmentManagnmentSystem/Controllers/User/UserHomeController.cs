using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CruiseEntertainmentManagnmentSystem.Models;
using CruiseEntertainmentManagnmentSystem.ViewModel;
using Microsoft.AspNet.Identity;
using SelectPdf;
using System.Data.Entity;
using CruiseEntertainmentManagnmentSystem.Filters;

namespace CruiseEntertainmentManagnmentSystem.Controllers.User
{
    [Authorize(Roles="User")]
    [InitializeSimpleMembership]
    public class UserHomeController : Controller
    {
        //
        // GET: /UserHome/
        CemsDbContext db = new CemsDbContext();
        public ActionResult Index()
        {
            var Person = ShrdMaster.Instance.GetPersonByUserName(User.Identity.Name);
            Session["Person"] = Person;
            return View();
        }

        public Persons GetPerson()
        {
            Persons person;
            if (Session["Person"] != null)
            {
                person = Session["Person"] as Persons;
            }
            else
            {
                person = ShrdMaster.Instance.GetPersonByUserName(User.Identity.Name);
                Session["Person"] = person;
            }
            return person;
        }


        public ActionResult ProfileView()
        {        
            Persons userdata;
            PersonalInformation information=null;
            userdata = ShrdMaster.Instance.GetPersonByUserName(User.Identity.Name);
            ViewBag.Categories = new SelectList(db.categories.ToList(),"ID","Name");
            SessionContext<Persons>.Instance.SetSession("User", userdata);
            //PersonalInformation vm = new PersonalInformation();
            if(userdata != null)
            {
                ViewBag.FullName= userdata.FirstName+" "+ userdata.LastName;
                ViewBag.Email = userdata.Email;
                Session["LoggedUser"] = userdata;

                information = db.PersonalInformations.FirstOrDefault(x => x.PersonID == userdata.ID);
                
                //vm.LastName = Userdata.LastName;
                //vm.Email = Userdata.Email;
            }
            if(information != null)
            {
                return View(information);
            }
            return View();
        }

        public ActionResult GetPositions(int ID)
        {
            var data = db.positions.Where(x => x.CategoryID == ID).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProfileView(PersonalInformation model)
        {

            if(ModelState.IsValid)
            {
                Persons person = SessionContext<Persons>.Instance.GetSession("User");
                if(person!=null)
                {
                    if(model.ID>0)
                    {
                        db.Entry(model).State = EntityState.Modified;
                    }
                    else
                    {
                        model.PersonID = person.ID;
                        db.PersonalInformations.Add(model);
                    }                    
                }                
                
                db.SaveChanges();
            }
            return View(model);
        }

        public ActionResult UploadImages()
        {
            
                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];
                    var person = SessionContext<Persons>.Instance.GetSession("User");
                    string Filename = file.FileName;
                    string ext = Filename.Substring(Filename.LastIndexOf('.'), (Filename.Length - Filename.LastIndexOf('.')));
                    Filename = person.ID + ext;

                    string path = Server.MapPath("~/ProfileImages");
                    path = Path.Combine(path, Filename);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }

                    file.SaveAs(path);
                string imagePath = "/ProfileImages/" + Filename;
                return Json(imagePath, JsonRequestBehavior.AllowGet);           
                }
            return Json("-1", JsonRequestBehavior.AllowGet);
            

            
        }
        

        public ActionResult CrewDataForm()
        {
            Persons person;
            person = GetPerson();
            ViewBag.Ships = new SelectList(ShrdMaster.Instance.GetShips("Norwegian"), "ID", "Name");

            ViewBag.Department = new SelectList(ShrdMaster.Instance.GetDepartmentforCrewDataForm(), "ID", "Name");
            
            return View();
        }

        [HttpPost]
        public ActionResult CrewDataForm(CrewDataForm model)
        {
            Persons person;
            person = SessionContext<Persons>.Instance.GetSession("User");
            if (ModelState.IsValid)
            {
                if (model.ID > 0)
                {
                    db.Entry(model).State = EntityState.Modified;
                }
                else
                {
                    model.PersonID = person.ID;
                    db.CrewdataForms.Add(model);
                }
                db.SaveChanges();
            }

            Session["Person"] = model;
            //ViewBag.Ship = new SelectList(db.cruises, "ID", "Name", person.Ship);
            //ViewBag.Status = new SelectList(Common.GetStatus(), "ID", "Value", person.Status);
            //ViewBag.Position = new SelectList(db.positions, "ID", "Name", person.Position);
            return RedirectToAction("CrewDataForm");
        }

        public ActionResult PersonalInformationForm()
        {
            var person = SessionContext<Persons>.Instance.GetSession("User");
            ViewBag.Positions = new SelectList(ShrdMaster.Instance.GetPostionsforPIF(person.ID), "ID", "Name");
            ViewBag.Ships = new SelectList(ShrdMaster.Instance.getShipsForPIF("Regent", "Oceania"), "ID", "Name");


            return View();
        }

        [HttpPost]
        public ActionResult PersonalInformationForm(PersonalInformationForm model)
        {
            var person = SessionContext<Persons>.Instance.GetSession("User");

            if(ModelState.IsValid)
            {
                if(model.ID>0)
                {
                    db.Entry(model).State = EntityState.Modified;
                }
                else
                {
                    db.PersonalInformationForms.Add(model);
                }
                db.SaveChanges();
            }

            return View(model);

        }

        public ActionResult TRF()
        {

            return View();

        }

        public ActionResult GetAllTRF()
        {
            Persons person;
            person = GetPerson();
            List<TRFModel> list=new List<TRFModel>();
            if (person != null)
            {
                //db.TRFs.Where(x => x.Person == person.ID);
                //var data=db.CruiseSubSchedules.Where(x => x.PersonID == person.ID && x.CruiseID == person.Ship).ToList();
                list = db.Database.SqlQuery<TRFModel>("exec GetTrfsByPersonID @personID", new SqlParameter("@personID", person.ID)).ToList();
                //foreach(CruiseSubSchedule )

            }
            return PartialView("_TRFPartial",list);
        }

        public ActionResult TRFEdit(int cruiseID)
        {
            Persons person;
            person = GetPerson();
           // var data = db.TRFs.ToList();
            TRFDataViewModel list = null;
            list = db.Database.SqlQuery<TRFDataViewModel>("execute GetTRFforPerson @personID, @CruiseID ", new SqlParameter("@personID", person.ID), new SqlParameter("@CruiseID", cruiseID)).FirstOrDefault();


           
            
            if (list == null)
            {
                list = new TRFDataViewModel();
                //list.Gender = person.Sex;
                //list.FirstName = person.FirstName;
                //list.LastName = person.LastName;
                //list.Nationality = person.CitizenShip;
                //list.Cruise = person.Ship;
                //if (person.DOB != null)
                //{
                //    list.DOB= person.DOB.Value;
                //}
                TRFModel lst = new TRFModel();

                lst = db.Database.SqlQuery<TRFModel>("exec GetTrfsByPersonID @personID", new SqlParameter("@personID", person.ID)).Where(x => x.CruiseID == cruiseID).FirstOrDefault();
                if(lst!=null)
                {
                    list.ArrivalDate = lst.EndDate;
                    list.DepartureDate = lst.StartDate;
                
                }
                var cruise = db.cruises.Where(x => x.ID == cruiseID).FirstOrDefault();
                if(cruise!=null)
                {
                    list.AccountNumber = cruise.AccountNumber;
                    list.Cruise = cruise.ID;                    
                }
                
            }
            
            if (list.Gender == 0)
            {
                list.IsFemale = true;
            }
            else
            {
                list.IsFemale = false;
            }
            

           
           
           

            ViewBag.Cruise = new SelectList(db.cruises, "ID", "Name",cruiseID);

            return View(list);
        }

        [HttpPost]
        public ActionResult TRFEdit(TRF model)
        {
                Persons person;
            person = GetPerson();
            if (model.ID == 0)
                {


                model.Person = person.ID;
                db.TRFs.Add(model);
            }
            else
            {
                db.Entry(model).State = EntityState.Modified;
            }
            db.SaveChanges();
            ViewBag.Cruise = new SelectList(db.cruises, "ID", "Name",model.Cruise);
            return RedirectToAction("TRF");
        }

        [AllowAnonymous]
        public ActionResult w9(int option=0,int personID=0)
        {
            Persons person;
            if (personID >0)
            {
                person=ShrdMaster.Instance.GetPersonByID(personID);
            } 
            else
            {
                person = GetPerson();
            }
            
            WNineViewModel list = null;
            list = db.WNines.Where(x => x.Person == person.ID).Select(x => new WNineViewModel
            {
                
                ID= x.ID,
                CCorporation=x.CCorporation,
                SCorporation=x.SCorporation,
                SoleProprietor=x.SoleProprietor,
                Trust=x.Trust,
                TaxClassification=x.TaxClassification,
                Other=x.Other,
                OtherText=x.OtherText,
                PartnerShip=x.PartnerShip,
                RequestorName=x.RequestorName,
                EmployerIdentificationNumber=x.EmployerIdentificationNumber,
                ExemptPayeeCode=x.ExemptPayeeCode,
                FATCACode=x.FATCACode ,
                BusinessName=x.BusinessName,
                AccountNumber=x.AccountNumber
            }).SingleOrDefault();
            if (list == null)
            {
                list = new WNineViewModel();
            }
            
            list.Name = person.FirstName+" "+person.LastName;
            //list.Address = person.Address;
            //list.City = person.City;
            //list.State = person.State;
            //list.Zip = person.Zip;
            //list.Person = person.ID;
            //list.SSN = person.SSN;
            if(option==1)
            {
                return View("w9pdf",list);
            }
            return View(list);
        }

        [HttpPost]
        public ActionResult w9(WNine model)
        {
            Persons person;
            person = GetPerson();
            if (model.ID == 0)
            {
                model.Person = person.ID;
                db.WNines.Add(model);
            }
            else
            {
                db.Entry(model).State = EntityState.Modified;
            }
            db.SaveChanges();
            
            return RedirectToAction("w9");
        }


       
        public void GenerateW9PDF()
        {
            Persons person;
            person = GetPerson();
            Logger.Instance.Log("Entered in ok part......2");
            /// convert to PDF
            HtmlToPdf Convertor = new HtmlToPdf();
            Logger.Instance.Log("Entered in ok part......2.1");
            //// create a new pdf document converting an url
            string url = "http://localhost:60291/UserHome/W9?option=1&personID=" + person.ID;
            //string url = "http://cems.infodatixhosting.com/UserHome/W9?option=1&personID=" + person.ID;

            Logger.Instance.Log("Entered in ok part......2.3");

            Logger.Instance.Log("Entered in ok part......3");
            string htmlCode;
            using (WebClient client = new WebClient())
            {

                // Download as a string.
                Logger.Instance.Log("Entered in ok part......3.1");
                htmlCode = client.DownloadString(url);
                Logger.Instance.Log("Entered in ok part......4");
            }

            Logger.Instance.Log("Entered in ok part......5");


          
            Convertor.Options.MarginTop = 20;
            Convertor.Options.MarginBottom = 20;
            Convertor.Options.MarginLeft= 20;
            Convertor.Options.MarginRight = 20;
            // Convertor.Options.WebPageHeight = 1000;
            PdfDocument doc = Convertor.ConvertHtmlString(htmlCode);
            string path = Server.MapPath("/PDF//");
            path +=  person.ID+"_W9Form.Pdf";
            doc.Save(path);
            Logger.Instance.Log("Entered in ok part......1");
            // close pdf document
            doc.Close();
            MemoryStream Stream = new MemoryStream();
            Response.Buffer = true;
            Response.AddHeader("Content-Disposition", "attachment; filename= " + Server.HtmlEncode(person.ID + "_W9Form.Pdf"));
            Response.ContentType = "APPLICATION/pdf";
            Stream writeToServer = new FileStream(path, FileMode.OpenOrCreate);
            Stream.WriteTo(writeToServer);
            Stream.Close();            
            writeToServer.Close();
            Response.WriteFile(path,false);
          //  return File(path,"application/PDF");
        }

        //public ActionResult GetTRFData()
        //{
        //    var data=db.persons.ToList();
        //    return PartialView("TRFData",data);
        //}
    }
}
