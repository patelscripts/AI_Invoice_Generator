import React, { useEffect, useState } from 'react'
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from '../../utils/ApiPath'
import { useNavigate } from 'react-router-dom'
import { FileText, DollarSign, Loader2, Plus } from 'lucide-react'
import moment from "moment"
import AIInsightCards from '../../components/ui/AIInsightCards'
const Dashboard = () => {

  const [stats, setStats] = useState({
    totalInvoices : 0,
    totalPaid: 0,
    totalUnpaid:0
  });

  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviagte = useNavigate();

  useEffect(() =>{
    const fetchDashboardData  = async () =>{
      try{
        const response = await axiosInstance.get(
          API_PATHS.INVOICE.GET_ALL_INVOICES
        );
        const invoices = response.data;
        const totalInvoices = invoices.length;
        const totalPaid = invoices
        .filter((inv) => inv.status === "paid")
        .reduce((acc, inv) => acc + inv.total, 0);

        const totalUnpaid = invoices
        .filter((inv) => inv.status !== "paid")
        .reduce((acc, inv) => acc + inv.total, 0);

        setStats({totalInvoices, totalPaid, totalUnpaid});
        setRecentInvoices(invoices
          .sort((a,b)=> new Date(b.invoiceDate) - new Date(a.invoiceDate))
          .slice(0,5)
        );
      }catch(error){
        console.error("Error fetching dashboard data:", error);
      }finally{
        setLoading(false);
      }
    }

    fetchDashboardData();
  },[]);

  const statsData = [
    {
      icon: FileText,
      label: "Total Invoices",
      value: stats.totalInvoices,
      color: "blue"
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: `${stats.totalPaid.toFixed(2)}`,
      color: "emerald"
    },
    {
      icon: DollarSign,
      label: "Total Unpaid",
      value: `${stats.totalUnpaid.toFixed(2)}`,
      color: "red"
    }
  ];
  const colorClasses = {
    blue :{bg : "bg-blue-100", text:"text-blue-600"},
    emerald :{bg : "bg-emerald-100", text:"text-emerald-600"},
    red :{bg : "bg-red-100", text:"text-red-600"},
  };

  if(loading){
    return (
      <div className='flex justify-center items-center h-96'>
        <Loader2 className="w-8 h-8 animate-spin text-blue-600"/>
      </div>
    );
  };
  return (
    <div className='space-y-8 mb-98'>
      <div>
        <h2 className='text-xl font-semibold text-slate-900'>DashBoard</h2>
        <p className='text-sm text-slate-600 mt-1'>
          A quick overview of your business finances.
        </p>
      </div>

      {/* stats cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        {statsData.map((stat, index) =>{
          return <div
          key={index}
          className='bg-white p-4 rounded-xl border border-slate-200 shadow-lg shadow-gray-100'>
            <div className='flex items-center'>
              <div
              className={`flex-shrink-0 w-12 h-12 ${
                colorClasses[stat.color].bg
              } rounded-lg flex items-center justify-center`}
              >
                <stat.icon
                className={`w-6 h-6 ${colorClasses[stat.color].text}`}
                />
              </div>
              <div className='ml-4 min-w-0'>
                <div className='text-sm font-medium text-slate-500 truncate'>
                  {stat.label}
                </div>
                <div className='text-2xl font-bold text-slate-900 break-words'>
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
      {/* AI Insight cards */}
      <AIInsightCards/>
      {/* Recent Invoices */}

      <div className='w-full bg-white border border-slate-200 rounded-lg shadow-sm shadow-gray-100 overflow-hidden'>
        <div className='px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center '>
          <h3 className='text-lg font-semibold text-slate-900'>
            Recent Invoices
          </h3>
          <button variant="ghost" onClick={()=>naviagte("/invoices")}>
            View All
          </button>
        </div>
        {recentInvoices.length > 0 ?(
          <div className='w-[90vw] md:w-auto overflow-x-auto'>
            <table className='w-full min-w-[600px] divide-y divide-slate-600'>
              <thead className='bg-slate-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                    Client
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                    Amount
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-slate-200'>
                {recentInvoices.map((invoice) => {
                   return (<tr
                  key={invoice._id}
                  className='hover:bg-slate-50 cursor-pointer'
                  onClick={() => naviagte(`/invoices/${invoice.id}`)}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-slate-900'>
                        {invoice.billTo.clientName}
                      </div>
                      <div className='text-sm text-slate-500'>
                        #{invoice.invoiceNumber}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-800'>
                      ${invoice.total.toFixed(2)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === "Paid"
                        ?"bg-emerald-100 text-emerald-800"
                        : invoice.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                      }`}>
                      {invoice.status}  
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-500'>
                      {moment(invoice.dueDate).format("MMM D, YYYY")}
                    </td>
                  </tr>
                   )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
              <FileText className='w-8 h-8 text-slate-400'/>
            </div>
            <h3 className='text-lg font-medium text-slate-900 mb-2'>
              No Invoices yet
            </h3>
            <p className='text-slate-500 mb-6 max-w-md'>
              You haven't created any invoices yet. Get started by creating your first one.
            </p>
            <button onClick={()=>naviagte('/invoices/new')} icon={Plus}>
              Create Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
