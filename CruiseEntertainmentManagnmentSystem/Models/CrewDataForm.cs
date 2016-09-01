using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace CruiseEntertainmentManagnmentSystem.Models
{
    public class CrewDataForm
    {
        public int ID { get; set; }
        public int PersonID { get; set; }
        public string MapsID { get; set; }
        public int Ship { get; set; }
        [DisplayName("Hair Color")]
        public string Hair { get; set;}
        [DisplayName("Hair Color")]
        public string Eye { get; set; }
        [DisplayName("Weight")]
        public string Weight { get; set;}
        [DisplayName("Height")]
        public string Height { get; set; }
        [DisplayName("Position/Department")]
        public string Department { get; set; }

        [DisplayName("Alien Resident Card#")]
        public string ARC { get; set; }

        [DisplayName("Name")]
        public string DependentName1 { get; set; }
        [DisplayName("Date of Birth")]
        public DateTime DependentDob1 { get; set; }
        [DisplayName("Name")]
        public string DependentName2 { get; set; }
        [DisplayName("Date of Birth")]
        public DateTime DependentDob2 { get; set; }
        [DisplayName("Name")]
        public string DependentName3 { get; set; }
        [DisplayName("Date of Birth")]
        public DateTime DependentDob3 { get; set; }
        [DisplayName("Name")]
        public string DependentName4 { get; set; }
        [DisplayName("Date of Birth")]
        public DateTime DependentDob4 { get; set; }
        [DisplayName("Name")]
        public string DependentName5 { get; set; }
        [DisplayName("Date of Birth")]
        public DateTime DependentDob5 { get; set; }
        [DisplayName("Sign off Date")]
        public DateTime SignOffDate { get; set; }
    }    
}