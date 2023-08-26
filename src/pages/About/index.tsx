import { useEffect } from "react";
import { aboutHeader, aboutStory, aboutMission } from "../../assets/About";
function About() {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <>
      <header className="mt-5   max-h-[300px] relative text-white overflow-hidden group">
        <img
          src={aboutHeader}
          alt=""
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300 ease-linear"
        />
        <h1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] lg:text-5xl z-[3]">
          About us
        </h1>
        <div className="absolute top-0 h-full w-full bg-[rgba(0,0,0,0.5)] z-[2]"></div>
      </header>
      <main className="mt-16 mb-12 pb-5">
        <section className="flex justify-between px-8 lg:w-[80%] mx-auto flex-col lg:flex-row">
          <article  className="flex-shrink-0 w-[100%]  lg:w-[calc(90%-350px)] text-gray-500 text-[15px] leading-6">
            <h2 className="font-bold text-2xl text-gray-700 mb-6">Our Story</h2>
            <p>
              Welcome to Sm Store, where imagination meets convenience! Our
              story began with a simple idea—to transform the way you shop
              online. We wanted to create an experience that goes beyond the
              ordinary, one that sparks your imagination and fills your life
              with joy and inspiration.
            </p>
            <br />
            <p>
              At Sm Store, we handpick a diverse range of products that
              capture the essence of creativity. From innovative gadgets to
              trendy accessories, our collection is carefully curated to bring a
              touch of magic to your everyday life. We believe in quality,
              functionality, and the power of imagination, and we strive to
              offer you a selection that combines these elements seamlessly.
            </p>
            <br />
            <p>
              We're committed to making your shopping journey seamless and
              enjoyable. With our user-friendly website, secure transactions,
              and dedicated customer service, we aim to provide you with a
              hassle-free experience. So, come and join us at Sm Store, and
              let your imagination run wild as you explore our captivating world
              of products. Get ready to embark on an extraordinary shopping
              adventure where inspiration and convenience await!
            </p>
          </article>
          <figure className="h-[350px] w-[350px] relative block group ml-8 mt-8 lg:mt-0 lg:ml-0">
            <div className="overflow-hidden h-[350px]">
              <img
                src={aboutStory}
                alt=""
                className="h-full w-full object-cover relative top-0  z-[2] group-hover:scale-110 transition-transform duration-300 ease-linear "
              />
            </div>
            <div className="absolute h-[350px] w-[350px] bottom-[-20px] border-2 border-gray-500 border-solid left-[-20px] z-[0]"></div>
          </figure>
        </section>
        <section className="flex justify-between px-8 lg:w-[80%] mx-auto flex-col-reverse lg:flex-row mt-[6.5rem]">
          <figure className="h-[350px] w-[350px] relative group mt-8 ml-8 lg:ml-0 lg:mt-0 ">
            <div className="overflow-hidden h-[350px] ">
              <img
                src={aboutMission}
                alt=""
                className="h-full w-full object-cover relative top-0 group-hover:scale-110 transition-transform duration-300 ease-linear z-[2]"
              />
            </div>
            <div className="absolute h-[350px] w-[350px] bottom-[-20px] border-2 border-gray-500 border-solid left-[-20px] z-[0]"></div>
          </figure>
          <article className="flex-shrink-0 w-[100%]  lg:w-[calc(90%-350px)] text-gray-500 text-[15px] leading-6">
            <h2 className="font-bold text-2xl text-gray-700 mb-6">Our Mission</h2>
            <p>
              At Sm Store, our mission is to ignite the spark of imagination
              in every shopper, transforming the act of online shopping into a
              captivating and joyous experience. We strive to curate a
              collection of innovative and whimsical products that inspire
              creativity and bring a sense of wonder into your everyday life.
              With secure transactions and exceptional customer service, we aim
              to provide convenience and seamless exploration of our virtual
              aisles.    
            </p>
            <br />
            <blockquote className="italic border-l-2 border-solid border-gray-400 pl-4 font-medium text-base">
            "Innovation
              distinguishes between a leader and a follower,"
              <span className="block font-light">- Steve Jobs</span>
            </blockquote>
            <br />
            <p>
              we are proud
              to lead the way in redefining the boundaries of e-commerce with
              our imaginative offerings.
            </p>
          </article>
        </section>
      </main>
    </>
  );
}

export default About;
