import { BarChart2, FileText, FileTextIcon, LayoutDashboard, Mail, Plus, Sparkles,Users } from "lucide-react";


export const FEATURES = [
    {
        icon : Sparkles,
        title : "AI Invoice Creation",
        description : "Paste any text , email or receipt, and let our  AI instantly generate a complete professional invoice for you"
    },
     {
        icon : BarChart2,
        title : "AI-Powered DashBoard",
        description : "Get smart, actionable insights about your business finances, generated automatically by our AI analyst"
    },
     {
        icon : Mail,
        title : "Smart Reminders",
        description : "Automatically generate polite and effective payment reminder emails for overdue invoices with a single click"
    },
     {
        icon : FileText,
        title : "Easy Invoice Management",
        description : "Easily manage all your invoices, track payments, and send reminders for overdue payments"
    },

]
export const TESTIMONIALS = [
  {
    quote: "This app saved me hours of work. I can now create and send invoices in minutes!",
    author: "Jane Doe",
    title: "Freelance Designer",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=JD"
  },
  {
    quote: "The best invoicing app I have ever used. Simple, intuitive, and powerful.",
    author: "John Smith",
    title: "Small Business Owner",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=JS"
  },
  {
    quote: "I love the dashboard and reporting features. It helps me keep track of my finances easily.",
    author: "Peter Jones",
    title: "Consultant",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=PJ"
  }
];

export const FAQS = [
  {
    question: "How does the AI invoice creation work?",
    answer:
      "Simply paste any text that contains invoice details—like client name, items, and prices. Our AI automatically extracts the data and generates a professional invoice."
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try our platform for free for 14 days. No credit card required."
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan anytime based on your needs."
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your subscription at any time. Your access will remain active until the end of the billing cycle."
  },
  {
    question: "Can I add extra details to my invoice?",
    answer:
      "Yes, you can add notes, payment terms, tax details, and even attach files to your invoices."
  },
  {
    question: "How does billing work?",
    answer:
      "Plans are billed per workspace, not per user. You can upgrade or cancel anytime."
  }
];

export const NAVIGATION_MENU = [
  {id : 'dashboard', name:"Dashboard", icon:LayoutDashboard},
  {id : 'invoices', name:"Invoices", icon:FileTextIcon},
  {id : 'invoices/new', name:"Create Invoice", icon:Plus},
  {id : 'profile', name:"Profile", icon:Users},
]