using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using SelectPdf;
using static System.Web.HttpContext;
using System.Web;

namespace CruiseEntertainmentManagnmentSystem.Models
{
    public class ShrdMaster
    {

        private static ShrdMaster _instance;
        private CemsDbContext db = new CemsDbContext();

        public static ShrdMaster Instance
        {
            get
            {
                if(_instance==null)
                {
                    _instance = new ShrdMaster();
                }

                return _instance;
            }
        }



        public string GenerateWord(string URL)
        {
            string htmlCode;                        
            using (WebClient client=new WebClient ())
            {
                htmlCode = client.DownloadString(URL);
            }

            return htmlCode;
        }



        public Persons GetPersonByUserName(string username)
        {
            var Person = db.persons.Where(x => x.UserName == username).FirstOrDefault();

            return Person;
        }

        public bool CheckTRF(int ID)
        {
            var data=db.TRFs.Where(x=>x.Person==ID).SingleOrDefault();
            if(data==null)
            {
                return false;
            }

            return true;

        }

        public IEnumerable<Persons> GetPersons()
        {

            var data = db.persons.ToList();
             data.ForEach(person => { person.FullName = person.FirstName + " " + person.LastName; });
            //var data =from person in db.persons
            //            select new Persons
            //            {
            //                FullName = person.FirstName + " " + person.LastName,
            //                Password = person.Password,
            //                Phone = person.Phone,
            //                Email = person.Email,
            //                DayRate = person.DayRate,
            //                WeeklySalary = person.WeeklySalary,
            //                SSN = person.SSN,
            //                ID = person.ID
            //            };

            return data.OrderBy(x=>x.FullName);
            //db.persons.Select(x => new { }).ToList();
        }

        public PdfDocument GeneratePDF(string URL)
        {
            /// convert to PDF
            HtmlToPdf converter = new HtmlToPdf();

            //// create a new pdf document converting an url
            //string url = "http://localhost:51369/Customer/InvoicePrint?orderID=" + orderID + "&PDF=1";


            string htmlCode;
            using (WebClient client = new WebClient())
            {

                // Download as a string.
                htmlCode = client.DownloadString(URL);
            }
            PdfDocument doc = converter.ConvertHtmlString(htmlCode);


            return doc;

            //string path = Server.MapPath("/PDF//");
            //path += order.ID + "_Receipt.Pdf";
            //doc.Save(path);
            //// close pdf document
            //doc.Close();
            ////sending mail 
            //var student = db.Students.Find(order.StudentID);
            //var org = db.Organizations.Find(order.SchoolID);
            //EmailService email = new EmailService(path);
            //IdentityMessage details = new IdentityMessage();
            //details.Destination = order.EmailAddress;
            //details.Subject = "Receipt! Fundraisingshop.com";
            //Dictionary<string, string> param = new Dictionary<string, string>();
            //if (org != null)
            //{
            //    param.Add("<%Student%>", student.StudentName);
            //    param.Add("<%School%>", org.Name);
            //}
            //else
            //{
            //    param.Add("<%Student%>", " ");
            //    param.Add("<%School%>", " ");
            //}

            //param.Add("<%customer%>", order.FullName);
            //details.Body = ShrdMaster.Instance.buildEmailBody("InvoiceEmailTemplate.txt", param);
            //string attachment = path;
            //await email.SendAsync(details);
        }




        public List<Persons> GetPersonsByCategoryID(int ID)
        {
            var list = db.persons.Join(db.PersonMappings, pr => pr.ID, pm => pm.PersonID, (pr, pm) => new { Persons = pr, PersonMapping = pm })
                .Where(x=>x.PersonMapping.CategoryID==ID).Select(x => x.Persons).ToList();
            //var l = list.ToList();
            list.ForEach(x => x.Checked ="checked");

            var personsList = db.persons.ToList().Except(list).AsEnumerable();
            personsList.ToList().ForEach(x => x.Checked = null);

            var joinlist= list.Union(personsList).OrderByDescending(x=>x.Checked).ToList();
            var finalList = joinlist.Select(x => new Persons
            {
                FullName=x.FirstName+" "+x.LastName,
                ID=x.ID,
                Checked=x.Checked
            }).ToList();

            return finalList;
        }


        public List<Category> GetCategoryIdByPersonID(int ID)
        {
            var list = db.categories.Join(db.PersonMappings, pr => pr.ID, pm => pm.CategoryID, (pr, pm) => new { Category = pr, PersonMapping = pm }).Where(x => x.PersonMapping.PersonID == ID).Select(x => x.Category).ToList();
            //var l = list.ToList();
            list.ForEach(x => x.Checked = "checked");

            var categoryList = db.categories.ToList().Except(list).AsEnumerable();
            categoryList.ToList().ForEach(x => x.Checked = null);

            var finalList = list.Union(categoryList).OrderByDescending(x => x.Checked).ToList();

            return finalList;
        }

        public void SavePersonMapping(string list,int PersonID)
        {
            if (!string.IsNullOrEmpty(list))
            {
                string[] catList = list.Split(',');
                PersonMapping map = null;
                int catID = 0;
                var prevList = db.PersonMappings.Where(x => x.PersonID == PersonID).ToList();
                if(prevList.Count>0)
                {
                    prevList.ForEach(x => { db.PersonMappings.Remove(x); db.SaveChanges(); });
                }
                
                

                foreach (string str in catList)
                {
                    map = new PersonMapping();
                    map.PersonID = PersonID;
                    int.TryParse(str, out catID);                    
                    map.CategoryID = catID;
                    db.PersonMappings.Add(map);
                    db.SaveChanges();
                }


            }
        }



        public bool CheckUserName(string username)
        {
              var data=db.persons.Where(x=>x.UserName==username).SingleOrDefault();

            if(data!=null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }



        public Persons GetPersonByID(int ID)
        {
            var person = db.persons.Find(ID);
            return person;
        }

        public bool IsUserAdmin(string username)
        {
            var users = db.persons.FirstOrDefault(x => x.UserName==username);
            UserProfile adminusers = null;
            UserRole roles = null;
            if(users==null)
            {
                adminusers = db.UserProfiles.FirstOrDefault(x => x.UserName == username);
                roles = db.UserRoles.FirstOrDefault(x => x.UserID == adminusers.UserId && x.RoleID==1);
            }
            else
            {
                roles = db.UserRoles.FirstOrDefault(x => x.UserID == users.ID && x.RoleID == 1);
            }

            if(roles!=null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }



        public string GetReturnUrl(string defaultUrl)
        {
            //if (defaultUrl == null) throw new ArgumentNullException(nameof(defaultUrl));

          
            if (Current.Request.QueryString["ReturnUrl"] != null)
            {
                string url = Current.Request.Url.AbsoluteUri;
                int index = url.IndexOf("returnUrl");
                string returnUrl = url.Substring(index,(url.Length-index));
                returnUrl = returnUrl.Replace("returnUrl=", "");
                defaultUrl = returnUrl;
                //Current.Request.QueryString[$"ReturnUrl"].ToString();
            }

            return defaultUrl;
        }


        public List<ShipBrand> GetBrands()
        {
            var data=db.Database.SqlQuery<ShipBrand>("exec sp_GetShipBrands").ToList();

            return data;
        }
    }

    public class ShipBrand
    {
        //public string ID { get; set; }
        public string Name { get; set; }
    }
}