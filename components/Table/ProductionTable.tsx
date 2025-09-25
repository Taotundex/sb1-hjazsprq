import React from 'react'

const ProductionTable = () => {
    const tableData = [
        { id: 1, one: "3", two: "77", three: "77", four: "77", five: '77', six: "4", seven: "287,196", eight: "58", nine: "287,196", ten: "58", eleven: "גזר" },
        { id: 2, one: "3", two: "77", three: "77", four: "77", five: '77', six: "4", seven: "7,196", eight: "58", nine: "7,196", ten: "58", eleven: "תל שבע" },
        { id: 3, one: "3", two: "77", three: "77", four: "77", five: '77', six: "3", seven: "287,196", eight: "58", nine: "287,196", ten: "58", eleven: "עומר" },
        { id: 4, one: "4", two: "77", three: "77", four: "77", five: '77', six: "6", seven: "7,196", eight: "58", nine: "7,196", ten: "58", eleven: "להבים" },
        { id: 5, one: "3", two: "77", three: "77", four: "77", five: '77', six: "7", seven: "287,196", eight: "58", nine: "287,196", ten: "58", eleven: "רהט" },
    ]
    return (
        <div className="px-5 py-6 rounded-[16px] border border-[#E9C863] bg-white flex flex-col gap-5">
            <h3 className='text-[#484C56] text-xl font-extrabold flex items-center gap-2 pr-5'>
                פוטנציאל ייצור - השוואה ליישובים דומים ( לתל אביב)
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#59687D" />
                        <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#59687D" />
                    </g>
                </svg>
            </h3>
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left text-[#0F0F0F] border border-[#DEDEDE] rounded-lg">
                    <thead className="text-xs text-[#0F0F0F] border border-[#DEDEDE] rounded-lg">
                        <tr>
                            <th scope="col" className="p-4 font-bold bg-white">
                                יישוב
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-[#DEDEDE]/40">
                                מימוש  <br />פוטנציאל <br />
                                (%)
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-white">
                                הספק <br />
                                מותקן <br />
                                <span className='font-normal text-xs'>(kW)</span>
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-[#DEDEDE]/40">
                                אחוז גידול בהספק <br />
                                <span className='font-normal text-xs'>(משנה קודמת) <br />
                                    (%)</span>
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-white">
                                פוטנציאל <br />
                                <span className='font-normal text-xs'>(kW)</span>
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-[#DEDEDE]/40">
                                הספק <br />
                                לתושב <br />
                                <span className='font-normal text-xs'>(kW/person)</span>
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-white">
                                הספק לקמ”ר <br />
                                בשטח שיפוט <br />
                                <span className='font-normal text-xs'>(kW/km²)</span>
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-[#DEDEDE]/40">
                                בקשות חיבור <br />
                                חדשות
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-white">
                                תשובות מחלק <br />
                                חיוביות
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-[#DEDEDE]/40">
                                תשובות מחלק <br />
                                חיוביות חלקית
                            </th>
                            <th scope="col" className="p-4 font-bold text-center bg-white flex items-center justify-center gap-2">
                                <span>
                                    דירוג <br />
                                    אנרגטי
                                </span>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                        <path d="M10.5 0.545898C4.98 0.545898 0.5 5.0259 0.5 10.5459C0.5 16.0659 4.98 20.5459 10.5 20.5459C16.02 20.5459 20.5 16.0659 20.5 10.5459C20.5 5.0259 16.02 0.545898 10.5 0.545898ZM10.5 18.5459C6.09 18.5459 2.5 14.9559 2.5 10.5459C2.5 6.1359 6.09 2.5459 10.5 2.5459C14.91 2.5459 18.5 6.1359 18.5 10.5459C18.5 14.9559 14.91 18.5459 10.5 18.5459Z" fill="#59687D" />
                                        <path d="M9.5 5.5459H11.5V7.5459H9.5V5.5459ZM9.5 9.5459H11.5V15.5459H9.5V9.5459Z" fill="#59687D" />
                                    </g>
                                </svg>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => (
                            <tr key={data.id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="p-4 bg-white">
                                    {data.eleven}
                                </td>
                                <td className="p-4 text-center bg-[#DEDEDE]/40">
                                    {data.ten}
                                </td>
                                <td className="p-4 text-center bg-white">
                                    {data.nine}
                                </td>
                                <td className="p-4 text-center bg-[#DEDEDE]/40">
                                    {data.eight}
                                </td>
                                <td className="p-4 text-center bg-white">
                                    {data.seven}
                                </td>
                                <td className="p-4 text-center bg-[#DEDEDE]/40">
                                    {data.six}
                                </td>
                                <td className="p-4 text-center bg-white">
                                    {data.five}
                                </td>
                                <td className="p-4 text-center bg-[#DEDEDE]/40">
                                    {data.four}
                                </td>
                                <td className="p-4 text-center bg-white">
                                    {data.three}
                                </td>
                                <td className="p-4 text-center bg-[#DEDEDE]/40">
                                    {data.two}
                                </td>
                                <th scope="row" className="px-4 py-4 text-gray-900 whitespace-nowrap bg-white flex items-center justify-center text-center gap-[10px]">
                                    <span>
                                        {data.one}
                                    </span>
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.98232 15.3869C9.30058 15.1944 9.69942 15.1944 10.0177 15.3869L13.9598 17.7722C14.7168 18.2302 15.652 17.5518 15.4514 16.69L14.4035 12.1867C14.3195 11.8258 14.442 11.448 14.7218 11.205L18.2141 8.17202C18.8815 7.59244 18.5239 6.49551 17.6432 6.4206L13.0518 6.03009C12.682 5.99864 12.36 5.76495 12.2155 5.42309L10.4211 1.17864C10.0769 0.364513 8.92312 0.364511 8.57893 1.17864L6.7845 5.42309C6.63997 5.76495 6.318 5.99864 5.94818 6.03009L1.35682 6.4206C0.476101 6.49551 0.118499 7.59244 0.785854 8.17202L4.27821 11.205C4.55798 11.448 4.68046 11.8258 4.59648 12.1867L3.54855 16.69C3.34801 17.5518 4.28318 18.2302 5.04021 17.7722L8.98232 15.3869Z" fill="#E9C863" />
                                    </svg>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div>
    )
}

export default ProductionTable