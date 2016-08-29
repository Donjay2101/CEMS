using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CruiseEntertainmentManagnmentSystem.Models;
using CruiseEntertainmentManagnmentSystem.ViewModel;
using System.Collections;

namespace CruiseEntertainmentManagnmentSystem.Controllers
{
    [Authorize(Roles="Admin")]
    public class HomeController : Controller
    {
        CemsDbContext db = new CemsDbContext();
        public ArrayList arr = new ArrayList();

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";


            //ViewBag.Schedule = db.CruiseSchedules.OrderBy(x=>x.CruiseID).ToList();

            return View();
        }

      

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        [HttpPost]
        public ActionResult About(HttpPostedFileBase file)
        {                    
                          
                if (file.ContentLength > 0)
                {
                    //read data from input stream
                    using (var csvReader = new System.IO.StreamReader(file.InputStream))
                    {
                        string inputLine = "";

                        int jan = 0;
                        //read each line
                         
                        while ((inputLine = csvReader.ReadLine()) != null)
                        {                           
                          
                            //get lines values
                            string[] values = inputLine.Split(new char[] { ',' });

                            //for (int x = 0; x < values.Length; x++)
                            //{
                                if (values[1] != "")
                                {
                                    if (values[1].Contains("Jan"))
                                    {
                                        int i = 1;
                                        while(values[i]!="")
                                        {

                                        }
                                        jan = 1;
                                    }
                                    else if(jan==1)
                                    {
                                        jan=0;
                                    }
                                }
                          //  }
                        
                        }
                        csvReader.Close();
                    }
                }

                return View();
        }

    }
}
