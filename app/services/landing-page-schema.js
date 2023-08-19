import Service from '@ember/service';

export default class LandingPageSchema extends Service {
  // This doesn't account for report types yet
  credit = {
    iiia: {
      left: [
        {
          componentType: 'story',
          destinations: ['iiia', 'europe', 'pulse'],
          title: 'IIIA Pulse'
        },
        {
          componentType: 'story',
          destinations: ['iiia', 'asia', 'pulse', 'non-japan'],
          title: 'Asia Pulse'
        },
        {
          componentType: 'story',
          destinations: ['iiia', 'japan', 'pulse'],
          title: 'Japan Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['asia', 'hkd', 'hong kong', 'priced'],
          title: 'HKD Priced Deals'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['iiia', 'europe', 'legal notices'],
          title: 'Legal Notices Headlines'
        },
        {
          componentType: 'story',
          destinations: ['iiia', 'asia', 'aus/nz', 'pulse'],
          title: 'Australia/NZ Pulse'
        },
        { extendLeft: false },
        { extendLeft: true }
      ]
    },
    asia: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'asia', 'ig', 'pulse'],
          title: 'Asia Credit Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'asia', 'ig', 'viewpoint'],
          title: 'Asia Viewpoints'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'emerging asia', 'china', 'ig', 'cnh', 'pulse'],
          title: 'CNH Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'asia', 'ig', 'usd', 'pipeline'],
          title: 'Asia USD Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'asia', 'ig', 'usd', 'priced'],
          title: 'Asia USD Priced Deals'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'asia', 'ig', 'reports'],
          title: 'Asia Reports'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'emerging asia', 'hong kong', 'ig', 'hkd', 'pulse'],
          title: 'HKD Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'emerging asia', 'china', 'ig', 'rmb', 'pulse'],
          title: 'RMB Pulse'
        },
        { extendLeft: true },
        { extendLeft: true }
      ]
    },
    structuredFinance: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'pulse'],
          title: 'Structured Finance Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'sf', 'abs', 'pipeline'],
          title: 'US ABS Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'sf', 'abs', 'priced'],
          title: 'US ABS Priced Deals'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'abs', 'pulse'],
          title: 'US ABS Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'cmbs', 'pulse'],
          title: 'US CMBS Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'sf', 'pulse'],
          title: 'Europe Structured Finance Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'europe', 'sf', 'priced'],
          title: 'Europe SF Priced Deals'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'europe', 'sf', 'pipeline'],
          title: 'Europe Structured Finance Pipeline'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'asia', 'sf', 'pulse'],
          title: 'Asia Structured Finance Pulse'
        },
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'reports'],
          title: 'Structured Finance Commentary'
        },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'abs', 'reports'],
          title: 'US ABS Reports'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'sf', 'cdo', 'pulse'],
          title: 'US CDO Pulse'
        },
        { extendLeft: false },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'sf', 'viewpoint'],
          title: 'Europe Structured Finance Viewpoints'
        }
      ]
    },
    americasInvestmentGrade: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'ig', 'pulse'],
          title: 'Americas Investment Grade Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'ig', 'reports', 'daily nics'],
          title: 'Daily NICs'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'ig', 'pipeline'],
          title: 'US IG Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'ig', 'priced'],
          title: 'US IG Priced Deals'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'ig', 'reports', 'commentary'],
          title: 'Americas Commentary'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'ig', 'data tables', 'vol wkly'],
          title: 'US IG Weekly Volume'
        },
        { extendLeft: true },
        { extendLeft: true },
      ]
    },
    highYield: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'hy', 'pulse'],
          title: 'US High Yield Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'hy', 'pipeline'],
          title: 'US High Yield Pipeline'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'hy', 'pulse'],
          title: 'Europe High Yield Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'us', 'hy', 'priced'],
          title: 'US HY Priced Deals'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'europe', 'hy', 'priced'],
          title: 'Europe HY Priced Deals'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'americas', 'us', 'hy', 'reports'],
          title: 'US High Yield Reports'
        },
        { extendLeft: true },
        { extendLeft: false },
        { extendLeft: true },
        { extendLeft: true }
      ]
    },
    loans: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'loans', 'pulse'],
          title: 'Loans Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'loans', 'leveraged', 'pulse'],
          title: 'Leveraged Loans Pulse'
        }
      ]
    },
    europeInvestmentGrade: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'pulse'],
          title: 'Europe Investment Grade Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'reports', 'am bullets'],
          title: 'Morning Bullets'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'europe', 'ig', 'pipeline'],
          title: 'Europe Ig Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'europe', 'ig', 'priced'],
          title: 'Europe IG Priced Deals'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'ssa', 'pulse'],
          title: 'SSA Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'fig', 'pulse'],
          title: 'FIG Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'eur', 'pulse'],
          title: 'EUR Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'viewpoint'],
          title: 'Europe Viewpoints'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'reports', 'daily close'],
          title: 'Daily Close'
        },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'corporates', 'pulse'],
          title: 'Corporate Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'covered', 'pulse'],
          title: 'Covered Bond Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'europe', 'ig', 'ssa', 'dist stats'],
          title: 'SSA Distribution Stats'
        }
      ]
    },
    emergingMarkets: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'em', 'pulse'],
          title: 'Emerging Market Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'em', 'pipeline'],
          title: 'Emerging Market Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'em', 'priced'],
          title: 'Emerging Market Priced Deals'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'latam', 'em', 'pulse'],
          title: 'LatAm Pulse'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'latam', 'em', 'pipeline'],
          title: 'LatAm Pipeline'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'latam', 'em', 'priced'],
          title: 'Latam Priced Deals'
        },
        {
          componentType: 'deal',
          destinations: ['credit', 'emerging asia', 'em', 'priced'],
          title: 'Emerging Asia Priced Deals'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'emerging asia', 'em', 'pulse'],
          title: 'Emerging Asia Pulse'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'mea', 'em', 'pulse'],
          title: 'MEA Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'em', 'viewpoint'],
          title: 'Emerging Market Viewpoints'
        },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['credit', 'latam', 'em', 'reports'],
          title: 'LatAm Reports'
        },
        { extendLeft: true },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['credit', 'cee', 'em', 'pulse'],
          title: 'CEE Pulse'
        },
        { extendLeft: false }
      ]
    },
    // Removed report type from mtns destinations
    mtns: {
      left: [
        {
          componentType: 'mtn',
          destinations: ['credit', 'europe', 'mtn'],
          period: 'daily',
          title: 'New EMTNs Daily'
        },
        {
          componentType: 'mtn',
          destinations: ['credit', 'europe', 'mtn'],
          period: 'weekly',
          title: 'Weekly EMTNs'
        },
        {
          componentType: 'mtn',
          destinations: ['credit', 'europe', 'mtn'],
          period: 'monthly',
          title: 'Monthly EMTNs'
        }
      ],
      right: [
        { extendLeft: true },
        { extendLeft: true },
        { extendLeft: true }
      ]
    },
    esgSriBonds: {
      left: [
        {
          componentType: 'story',
          destinations: ['credit', 'pulse', 'esg/sri bond'],
          title: 'ESG/SRI BONDS'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'pulse', 'social bond'],
          title: 'SOCIAL BONDS'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'pulse', 'sustainability-linked bond'],
          title: 'SUSTAINABILITY-LINKED BONDS'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['credit', 'pulse', 'green bond'],
          title: 'GREEN BONDS'
        },
        {
          componentType: 'story',
          destinations: ['credit', 'pulse','sustainability bond'],
          title: 'SUSTAINABILITY BONDS'
        },
      ]
    },
    premiumCreditReports: {
      left: [
        {
          componentType: 'story',
          destinations: ['premium credit reports'],
          title: 'ALL PREMIUM CREDIT REPORTS'
        },
        {
          componentType: 'story',
          destinations: ['premium credit reports','us'],
          title: 'U.S. PREMIUM CREDIT REPORTS'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['premium credit reports','europe'],
          title: 'EUROPE PREMIUM CREDIT REPORTS'
        },
        {
          componentType: 'story',
          destinations: ['premium credit reports','asia'],
          title: 'APAC PREMIUM CREDIT REPORTS'
        },
      ]
    }
  };
  fx = {
    majors: {
      left: [
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'pulse'],
          title: 'FX Majors Pulse'
        },
        {
          componentType: 'technical-composite',
          destinations: ['fx', 'majors', 'tech composite'],
          title: 'FX MAJORS TECH COMPOSITE '
        },
        {
          componentType: 'technical-composite',
          destinations: ['equities', 'europe', 'fx', 'tech composite'],
          title: 'FX EUROPE TECH COMPOSITE - EQUITIES'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'usd', 'pulse'],
          title: 'USD Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'jpy', 'pulse'],
          title: 'JPY Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'trade strategies'],
          title: 'FX Majors Trade Ideas'
        },
        { extendLeft: true },
        { extendLeft: true },
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'eur', 'pulse'],
          title: 'EUR Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'gbp', 'pulse'],
          title: 'GBP Pulse'
        }
      ]
    },
    options: {
      left: [
        {
          componentType: 'story',
          destinations: ['fx', 'options', 'pulse'],
          title: 'FX Options Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'options', 'expiry'],
          title: 'FX Options Expiry'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['fx', 'options', 'eur/usd', 'commentary'],
          title: 'FX Options Comment'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'options', 'expiry', 'exotics'],
          title: 'FX Options Expiry Exotics'
        }
      ]
    },
    dataAndEventsCalendar: {
      left: [],
      right: []
    },
    emergingMarkets: {
      left: [
        {
          componentType: 'story',
          destinations: ['fx', 'em', 'pulse'],
          title: 'FX EM Pulse'
        },
        {
          componentType: 'technical-composite',
          destinations: ['emerging asia', 'fx', 'rates', 'tech composite'],
          title: 'FX ASIA TECH COMPOSITE'
        },
        {
          componentType: 'technical-composite',
          destinations: ['asia', 'equities', 'fx', 'rates', 'tech composite'],
          title: 'FX ASIA TECH COMPOSITE - EQUITIES'
        },
        {
          componentType: 'technical-composite',
          destinations: ['cee', 'em', 'fx', 'rates', 'tech composite'],
          title: 'FX CEE TECH COMPOSITE - EMEA'
        },
        {
          componentType: 'technical-composite',
          destinations: ['em', 'fx', 'tech composite'],
          title: 'FX EM TECH COMPOSITE - GLOBAL'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'emerging asia', 'china', 'em', 'pulse'],
          title: 'FX China Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'emerging asia', 'em', 'pulse'],
          title: 'FX Emerging Asia Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'cee', 'em', 'pulse'],
          title: 'FX CEE Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['fx', 'em', 'ce3', 'pulse'],
          title: 'FX CE3 Pulse'
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          componentType: 'story',
          destinations: ['rates', 'emerging asia', 'china', 'em', 'pulse'],
          title: 'China CB Outlook'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'latam', 'em', 'pulse'],
          title: 'FX LatAm Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'mea', 'em', 'pulse'],
          title: 'FX MEA Pulse'
        },
      ]
    },
    technicals: {
      left: [
        {
          componentType: 'story',
          destinations: ['fx', 'majors', 'techs', 'pulse'],
          title: 'FX Technicals Majors Headlines'
        },
        {
          componentType: 'technical-composite',
          destinations: ['fx', 'majors', 'tech composite'],
          title: 'FX MAJORS TECH COMPOSITE '
        },
        {
          componentType: 'technical-composite',
          destinations: ['em', 'fx', 'tech composite'],
          title: 'FX EM TECH COMPOSITE - GLOBAL'
        }
      ],
      right: [
        {
          componentType: 'technical',
          destinations: ['fx', 'majors', 'tech analysis', 'eur/usd'],
          title: 'FX MAJORS TECH ANALYSIS EUR/USD'
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        }
      ]
    }
  };
  rates = {
    bonds: {
      left: [
        {
          componentType: 'story',
          destinations: ['rates', 'pulse'],
          title: 'Rates Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'europe', 'pulse'],
          title: 'Rates Europe Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'americas', 'us', 'pulse'],
          title: 'Rates US Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'asia', 'pulse'],
          title: 'Rates Asia Pulse'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['rates', 'europe', 'trade strategies'],
          title: 'Rates & Trade Recommendations'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'europe', 'briefing'],
          title: 'Rates Europe Briefing'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'americas', 'us', 'briefing'],
          title: 'Rates US Briefing'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'asia', 'briefing'],
          title: 'Rates Asia Briefing'
        }
      ]
    },
    emergingMarkets: {
      left: [
        {
          componentType: 'story',
          destinations: ['rates', 'em', 'pulse'],
          title: 'Global Emerging Market Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'emerging asia', 'china', 'em', 'pulse'],
          title: 'China Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'mea', 'em', 'pulse'],
          title: 'MEA Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'cee', 'em', 'viewpoint'],
          title: 'CEE Viewpoint'
        },
        {
          componentType: 'technical-composite',
          destinations: ['emerging asia', 'fx', 'rates', 'tech composite'],
          title: 'RATES ASIA TECH COMPOSITE'
        },
        {
          componentType: 'technical-composite',
          destinations: ['asia', 'equities', 'fx', 'rates', 'tech composite'],
          title: 'RATES ASIA TECH COMPOSITE - EQUITIES'
        },
        {
          componentType: 'technical-composite',
          destinations: ['cee', 'em', 'fx', 'rates', 'tech composite'],
          title: 'RATES EM TECH COMPOSITE - CEE'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['rates', 'emerging asia', 'em', 'pulse'],
          title: 'Emerging Asia Pulse'
        },
        {
          componentType: 'story',
          destinations: ['fx', 'emerging asia', 'em', 'viewpoint'],
          title: 'Emerging Asia Viewpoint'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'latam', 'em', 'pulse'],
          title: 'LatAm Pulse'
        },
        {
          componentType: 'story',
          destinations: ['rates', 'latam', 'em', 'viewpoint'],
          title: 'LatAm Viewpoint'
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        }
      ]
    },
    moneyMarkets: {
      left: [
        {
          componentType: 'story',
          destinations: ['rates', 'pulse'],
          title: 'Money Market Pulse'
        },
        {
          componentType: 'technical-composite',
          destinations: ['rates', 'stir', 'tech composite'],
          title: 'RATES GLOBAL STIR TECH COMPOSITE'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'americas', 'us', 'stir', 'tech analysis'],
          title: 'Euro$ Future Technical Analysis'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'europe', 'stir', 'spreads'],
          title: 'Spreads (STIR)'
        }
      ],
      right: [
        {
          componentType: 'story',
          destinations: ['rates', 'int rate forecast'],
          title: 'Rates & Interest Rate Forecast'
        },
        {
          extendLeft: true
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'europe', 'emu', 'euribor fut', 'stir', 'tech analysis'],
          title: 'Euribor Future Technical Analysis'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'europe', 'emu', 'bonds', 'spreads', '2y,10y euro', 'tech analysis'],
          title: 'Spreads 2Y, 10Y, EURO'
        }
      ]
    },
    dataAndEventsCalendar: {
      left: [],
      right: []
    },
    technicals: {
      left: [
        {
          componentType: 'story',
          destinations: ['rates', 'techs'],
          title: 'Rates Technical Headlines'
        },
        {
          componentType: 'technical-composite',
          destinations: ['americas', 'rates', 'tech composite', 'us'],
          title: 'RATES AMERICAS TECH COMPOSITE - US'
        },
        {
          componentType: 'technical-composite',
          destinations: ['asia', 'australia', 'japan', 'rates', 'tech composite'],
          title: 'RATES ASIA TECH COMPOSITE - AUSTRALIA & JAPAN'
        },
        {
          componentType: 'technical-composite',
          destinations: ['europe', 'rates', 'tech composite'],
          title: 'RATES EUROPE TECH COMPOSITE - EUROPE'
        },
        {
          componentType: 'technical-composite',
          destinations: ['emu', 'europe', 'rates', 'tech composite'],
          title: 'RATES EUROPE TECH COMPOSITE - EMU'
        },
        {
          componentType: 'technical-composite',
          destinations: ['rates', 'tech composite'],
          title: 'RATES GLOBAL FI TECH COMPOSITE'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'futures', 'bund fut'],
          title: 'Bund Future Technical Analysis'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'futures', 'l-gilt fut'],
          title: 'L-Gilt Future Technical Analysis'
        }
      ],
      right: [
        {
          componentType: 'technical',
          destinations: ['rates', 'tech analysis', 'us 10y fut'],
          title: 'Technical Analysis (US 10Y Fut)'
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          extendLeft: true
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'futures', 'tech analysis', 'jgb 10y fut'],
          title: 'JGB 10Y Future Technical Analysis'
        },
        {
          componentType: 'technical',
          destinations: ['rates', 'futures', 'aus 10y fut'],
          title: 'Aus 10Y Future Technical Analysis'
        }
      ]
    }
  };

}
