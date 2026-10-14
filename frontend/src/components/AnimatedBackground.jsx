import React from "react";

import "./AnimatedBackground.css";


const AnimatedBackground = () => {


    return (

        <div className="animated-bg">


            <div className="grid-lines"></div>


            <div className="particles">


                {
                    Array.from({length:25}).map((_,i)=>(

                        <span

                            key={i}

                            className="particle"

                            style={{

                                left:`${Math.random()*100}%`,

                                animationDelay:`${Math.random()*10}s`

                            }}

                        >

                        </span>

                    ))
                }


            </div>


            <div className="light-effect"></div>


        </div>

    );

};


export default AnimatedBackground;