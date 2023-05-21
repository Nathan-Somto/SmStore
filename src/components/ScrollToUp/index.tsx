import { FaAngleUp } from "react-icons/fa"
import { useEffect, useRef } from "react"
function ScrollToUp() {
    const icon = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        function showIcon(){
            if( icon.current !== null){
            if (window.scrollY > screen.height){
              icon.current.classList.remove('hidden');
              return;
            }
            icon.current.classList.add('hidden');
      
          }
        }
          document.addEventListener('scroll',showIcon);
          return ()=> document.removeEventListener('scroll',showIcon);
    }, [])
    
    function handleScrollUp(): void {
       window.scrollTo({top:0, left:0, behavior:"smooth"});
    }

  return (
    <button onClick={handleScrollUp} ref={icon} className="fixed bg-[#ff084e] text-[1.65rem] transition-all ease-in duration-300 rounded-md flex items-center justify-center text-white h-[40px] w-[40px] z-[20] bottom-[30px] shadow-xl right-[30px]">
        <FaAngleUp/>
    </button>
  )
}

export default ScrollToUp