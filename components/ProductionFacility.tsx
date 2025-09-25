import React from 'react'
import InstalledCapacityTwo from './Charts/InstalledCapacityTwo'

const ProductionFacility = () => {
    return (
        <div>
            <div className="md:px-[60px] px-5 pb-[52px]">
                <h2 className='text-[#276E4E] text-[34px] font-extrabold'>מתקני ייצור מחוברים</h2>
            </div>
            <div className="bg-[#FDFBF6] border border-[#DEDEDE]/70 md:rounded-[40px] rounded-[20px] px-5 py-6 flex flex-col">
                <InstalledCapacityTwo />
            </div>
        </div>
    )
}

export default ProductionFacility