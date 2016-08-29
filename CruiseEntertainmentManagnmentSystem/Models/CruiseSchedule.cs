using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CruiseEntertainmentManagnmentSystem.Models
{
    public class CruiseSchedule
    {
        public int ID { get; set; }
        public int TaskID { get; set; }
        public DateTime Date { get; set; }
        public int CruiseID { get; set; }
        public int ScheduleNo { get; set; }
    }
}