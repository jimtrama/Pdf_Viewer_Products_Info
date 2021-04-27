
import './App.css';
import Viewer, { Worker, SpecialZoomLevel } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import pdf1 from './pdfs/MexicoEthnicCuisine.pdf'

import { useEffect, useState } from 'react';
function App() {
    const [pdf, setPdf] = useState("./");
    const [load, setLoad] = useState(false);
    const [loadPdf, setLoadPdf] = useState(false);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const pdfUrl = urlParams.get('pdf');
        if (pdfUrl === "EthnicCuisineMexico") {
            setPdf(pdf1)
        }
        // if (pdfUrl === "India") {
        //     setPdf(pdf2)
        // }
        setLoadPdf(true);

    }, [])
    

    

    if (loadPdf) {
        document.getElementById("pdfviewer").addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        })
        

    }
    function documentLoad(e) {
        let scale = document.querySelector('.viewer-canvas-layer canvas').style.transform;
        scale = parseFloat(scale);
        let width = e.clientWidth*scale;
        document.querySelector('.viewer-canvas-layer canvas').style.transform = " transalte(-50%,-50%)";
        document.getElementsByTagName('canvas')[0].style.margin='auto';
        document.getElementsByClassName('viewer-page-layer')[0].style.width=`${width}px`
        
        
    }


    return (
        <div className="App" >
            <div oncontextmenu="return false;">


                <Worker  workerUrl=" https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                    <div id="pdfviewer" style={{ position: "absolute", transform: "translate(-50%,-50%)", top: "50%", left: "50%" }}>
                        {
                            loadPdf ? <Viewer   defaultScale={SpecialZoomLevel.PageFit} onCanvasLayerRender={documentLoad} fileUrl={pdf} /> : <></>
                        }
                    </div>
                </Worker>



            </div>
        </div>
    );
}

export default App;
