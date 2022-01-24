import { height, width } from "@mui/system";
import React, { useState, useEffect } from "react";
import {ReactPictureAnnotation,defaultShapeStyle,DefaultInputSection} from "react-picture-annotation";
import "../App.css";

// function DrawBox(){
//   const [pageSize, setPageSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   });

//   const onResize = () => {
//     setPageSize({ width: window.innerWidth, height: window.innerHeight });
//   };


//   useEffect(() => {
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const onSelect = selectedId => console.log(selectedId);
//   const onChange = data => console.log(data);

//   return (
//     <div className="App">
//       <ReactPictureAnnotation
//         image="https://source.unsplash.com/random/800x600"
//         onSelect={onSelect}
//         onChange={onChange}
//         width={pageSize.width}
//         height={pageSize.height}
//         annotationStyle={{
//           ...defaultShapeStyle,
//           shapeStrokeStyle: "#2193ff",
//           transformerBackground: "black"
//         }}
//         inputElement={(value, onChange, onDelete) => (
//           <DefaultInputSection
//             placeholder={"Hello world"}
//             {...{ value, onChange, onDelete }}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default DrawBox


function DrawBox(){
                        const [pageSize, setPageSize] = useState({
                            width: window.innerWidth,
                            height: window.innerHeight
                        });

                        const onResize = () => {
                            setPageSize({ width: window.innerWidth, height: window.innerHeight });
                        };

                        useEffect(() => {
                            window.addEventListener("resize", onResize);
                            return () => window.removeEventListener("resize", onResize);
                          }, []);

                          const onSelect = selectedId => console.log(selectedId);
                          const onChange = data => console.log(data);

                          return (
                            <div className="draggable-canvas">
                              <ReactPictureAnnotation
                                // image="https://source.unsplash.com/random/800x600"
                                onSelect={onSelect}
                                onChange={onChange}
                                width={pageSize.width}
                                height={pageSize.height}
                                annotationStyle={{
                                  ...defaultShapeStyle,
                                  shapeStrokeStyle: "rgba(53, 42, 182)",
                                  transformerBackground: "white"
                                }}
                                inputElement={(value, onChange, onDelete) => (
                                  <DefaultInputSection
                                    placeholder={"Hello world"}
                                    {...{ value, onChange, onDelete }}
                                  />
                                )}
                              />
                            </div>
                          );


      }
      
      
      export default DrawBox

