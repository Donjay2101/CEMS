using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CruiseEntertainmentManagnmentSystem.Models;
using CruiseEntertainmentManagnmentSystem.ViewModel;

namespace CruiseEntertainmentManagnmentSystem.Controllers
{
    [Authorize(Roles="Admin")]
    public class CabinBookingController : Controller
    {
        private CemsDbContext db = new CemsDbContext();
        string _ReturnUrl;
        //private  object CabinName;

        //
        // GET: /CabinBooking/

        public ActionResult Index()
        {
            return View(db.CabinBookings.ToList());
        }

        //
        // GET: /CabinBooking/Details/5

        public ActionResult Details(int id = 0)
        {
            CabinBooking cabinbooking = db.CabinBookings.Find(id);
            if (cabinbooking == null)
            {
                return HttpNotFound();
            }
            return View(cabinbooking);
        }
        public ActionResult GetBooking(DateTime? From, DateTime? To)
        {

            List<CabinBooking> Bookings = null;
            NewDate dt = new NewDate();

            if (From.Value != null && To.Value != null)
            {
                DateTime fromdate = From.Value;
                DateTime todate = To.Value;
            
                //Bookings = db.Bookings.Where(x => x.bookingdate >= From && x.bookingdate <= To).ToList();
                Bookings = db.CabinBookings.ToList();
                List<DateTime> date = null;
                date = DateRange(fromdate, todate).ToList();
                dt.dates = date;
                dt.booking = Bookings;
                dt.Cabins = db.cabins.ToList();

                
            }
            return PartialView("_NewBooking", dt);
           
        }
        public string AutoGenerateNumber()
        {

            //first name of School
            //string []initial = Name.Split(' ');


            //generate Random number between 1 to 100000
            Random r = new Random();
            int num = r.Next(100000, 999999);

            //concatenate both
            string number = "R" + num.ToString();


            //if (!CheckStudentID(number, OrgID))
            //{
            //    AutoGenerateNumber(OrgID);
            //}
            //string studentID = "";
            // var student= db.Students.SingleOrDefault(n => n.StudentID == number);
            //if(student!=null)
            //{
            //    studentID=student.StudentID;
            //}
            //if(!string.IsNullOrEmpty(studentID))
            //{

            //}
            //Return the generated number
            return number;


        }
        //
        // GET: /CabinBooking/Create
        public IEnumerable<DateTime> DateRange(DateTime fromDate, DateTime toDate)
        {
            return Enumerable.Range(0, toDate.Subtract(fromDate).Days + 1)
                             .Select(d => fromDate.AddDays(d));
        }



        public ActionResult Create(string id)
        {
            int ID;
            int.TryParse(id.ToString(), out ID);
            var cabins=db.cabins.ToList();
            SelectList list = new SelectList(cabins,"ID","CabinName",ID);
            ViewBag.CabinNo = list;
            string number = AutoGenerateNumber();
            ViewBag.Reservation = number;
            ViewBag.Position = new SelectList(db.positions, "ID", "Name");
            ViewBag.BookingType = new SelectList(db.bookingtype, "ID", "Name");
            ViewBag.ReturnUrl = ShrdMaster.Instance.GetReturnUrl("CabinBooking/Index");
            return View();
        }

        //
        // POST: /CabinBooking/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CabinBooking cabinbooking)
        {
            _ReturnUrl = ShrdMaster.Instance.GetReturnUrl("CabinBooking/Index");
            if (ModelState.IsValid)
            {
                db.CabinBookings.Add(cabinbooking);
                db.SaveChanges();
                return RedirectToAction(_ReturnUrl);
            }
            var cabins = db.cabins.ToList();
            SelectList list = new SelectList(cabins,"ID", "CabinName",cabinbooking.CabinNo);
            ViewBag.CabinNo = list;
            //ViewBag.CabinNo = new SelectList(db.cabins, "ID", "CabinName", cabinbooking.CabinNo);
            ViewBag.Position = new SelectList(db.positions, "ID", "Name", cabinbooking.Position);
            ViewBag.BookingType = new SelectList(db.bookingtype, "ID", "Name",cabinbooking.BookingType);
            ViewBag.ReturnUrl = _ReturnUrl;
            return View(cabinbooking);
        }

        //
        // GET: /CabinBooking/Edit/5

        public ActionResult Edit(int id = 0)
        {
            CabinBooking cabinbooking = db.CabinBookings.Find(id);
            if (cabinbooking == null)
            {
                return HttpNotFound();
            }
            ViewBag.ReturnUrl = ShrdMaster.Instance.GetReturnUrl("CabinBooking/Index");
            return View(cabinbooking);
        }

        //
        // POST: /CabinBooking/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(CabinBooking cabinbooking)
        {
            _ReturnUrl = ShrdMaster.Instance.GetReturnUrl("CabinBooking/Index");
            if (ModelState.IsValid)
            {
                db.Entry(cabinbooking).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction(_ReturnUrl);
            }
            ViewBag.ReturnUrl = _ReturnUrl;
            return View(cabinbooking);
        }

        //
        // GET: /CabinBooking/Delete/5

        public ActionResult Delete(int id = 0)
        {
            CabinBooking cabinbooking = db.CabinBookings.Find(id);
            if (cabinbooking == null)
            {
                return HttpNotFound();
            }
            return View(cabinbooking);
        }

        //
        // POST: /CabinBooking/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CabinBooking cabinbooking = db.CabinBookings.Find(id);
            db.CabinBookings.Remove(cabinbooking);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}