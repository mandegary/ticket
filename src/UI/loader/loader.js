import React from "react"
import './loader.css'
const Loader = () => (
    <div className="loaderr loader--style7">
        <svg x="0px" y="0px" width="24px" viewBox="0 0 24 30" height="25px">
            <rect fill="#333" height="25" width="5" x="1" y="2">
                <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0s" dur="0.6s"
                         repeatCount="indefinite"></animate>
            </rect>
            <rect fill="#333" height="25" width="5" x="10" y="2">
                <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.2s" dur="0.6s"
                         repeatCount="indefinite"></animate>
            </rect>
            <rect fill="#333" height="25" width="5" x="19" y="2">
                <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.4s" dur="0.6s"
                         repeatCount="indefinite"></animate>
            </rect>
        </svg>
    </div>
);
export default Loader;