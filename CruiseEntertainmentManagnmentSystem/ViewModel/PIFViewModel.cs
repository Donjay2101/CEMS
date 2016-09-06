using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CruiseEntertainmentManagnmentSystem.ViewModel
{
    public class PIFViewModel
    {
        public int ID { get; set; }
        public int PersonID { get; set; }
       
        public int CurrentAddressStay { get; set; }
       
        public string SecondaryPassportNumber { get; set; }
       
        public string SecondaryIssueCountry { get; set; }
       
        public Nullable<DateTime> SecondaryIssueDate { get; set; }
       
        public Nullable<DateTime> SecondaryExpireDate { get; set; }

       
        public bool IsUsCitizen { get; set; }
       
        public bool IsUsResident { get; set; }
        public int Position { get; set; }
        public int Ship { get; set; }
       
        public bool IsCriminalRecord { get; set; }
       
        public string CriminalCaseExplaination { get; set; }
        
        public bool IsDismissed { get; set; }
        
        public string DismissCruiseExplaination { get; set; }
        
        public bool IsVisaAssignToOther { get; set; }
        
        public string ToWhomCruise { get; set; }
        
        public bool IsKnowRestrictions { get; set; }
      
        public string ReasonOfRestriction { get; set; }
      
        public bool IsSeamanBook { get; set; }
      
        public string IssuingAuthority { get; set; }
      
        public DateTime SeamanExpiryDate { get; set; }

    }
}