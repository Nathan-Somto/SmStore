function Loading() {
  return (
    <div className='h-[550px] w-[350px] space-y-4'>
        <div className='h-[400px]  animate-pulse bg-[rgba(0,0,0,0.35)] w-[350px]'></div>
        <div className='flex space-x-4 h-[80px]'>
            <div>
                <div className='h-[20px] w-[200px] bg-[rgba(0,0,0,0.35)] animate-pulse mb-2'></div>
                <div className='h-[40px] w-[200px] bg-[rgba(0,0,0,0.35)] animate-pulse mb-2'></div>
                <div className='h-[15px] w-[55px] bg-[rgba(0,0,0,0.35)] animate-pulse'></div>
            </div>
            <div className='flex space-x-1'>
                {new Array(5).fill('').map((_, index)=> <span key={index} className='h-[5px] w-[5px] bg-[rgba(0,0,0,0.5)] animate-pulse'></span>)}
            </div>
        </div>
    </div>
  )
}

export default Loading