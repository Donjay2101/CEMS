﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CruiseEntertainmentManagnmentSystem.Models
{
    public class WNine
    {
        public int ID { get; set; }
        public bool SoleProprietor { get; set; }
        public bool CCorporation { get; set; }
        public bool SCorporation { get; set; }
        public bool PartnerShip { get; set; }
        public bool Trust { get; set; }
        public bool LLC { get; set; }
        public string TaxClassification { get; set; }
        public bool Other { get; set; }
        public string OtherText { get; set; }
        public string RequestorName { get; set; }
        public string EmployerIdentificationNumber { get; set; }
        public string ExemptPayeeCode { get; set; }
        public string FATCACode { get; set; }
        public string BusinessName { get; set; }
        public string AccountNumber { get; set; }
        public int Person { get;set; }
    }
}