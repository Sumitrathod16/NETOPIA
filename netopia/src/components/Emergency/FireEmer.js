import React from "react";
import { ArrowLeft } from "lucide-react";

export const FireEmer = ({ onBack }) => {
    return (
        <>
        <style>{`
            * { box-sizing: border-box; }

            /* Header */
            .fire-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 1.25rem;
                background: #ffffff;
                border-bottom: 1px solid #e5e7eb;
            }

            .fire-back-button {
                background: transparent;
                border: none;
                padding: 0.45rem;
                border-radius: 0.375rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
            }

            .fire-back-button:hover { background-color: #f3f4f6; }

            .fire-header-info { display:flex; flex-direction:column; justify-content:center; }
            .fire-header-info h1 { font-size:1.05rem; margin:0; color:#111827; }
            .fire-header-subtitle { margin:0; font-size:0.85rem; color:#6b7280; }

            /* Page layout */
            .full-width-page{
                width:100vw;
                min-height:100vh;
                margin-left: calc(-50vw + 50%);
                padding:2rem 0;
            }

            .fire-emergency-container{
                width:100%;
                max-width:1400px;
                margin:0 auto;
                padding:2rem;
            }

            .emergency-fire{
                background-color:#ed7a41;
                border:1px solid #ebcdbe;
                border-radius:12px;
                padding:2rem;
                margin-bottom:1.5rem;
            }

            .emergency-fire h2 { color:#0c5460; margin:0 0 0.75rem 0; }
            .emergency-fire p { color:#0c5460; font-size:1rem; margin:0; }

            .emr-types, .immediate-actions, .emr-call, .emr-tools{
                background:#ffffff;
                border:1px solid #dddddd;
                border-radius:8px;
                padding:1.5rem;
                margin-bottom:1.25rem;
            }

            .emr-types h3, .immediate-actions h3, .emr-call h3, .emr-tools h3{
                color:#333333; margin:0 0 0.75rem 0;
            }

            .emr-types ul, .emr-tools ul { list-style-type: disc; padding-left:1.5rem; margin:0; }
            .emr-types ul li, .emr-tools ul li { margin-bottom:0.6rem; line-height:1.45; }

            .immediate-actions ol { padding-left:1.5rem; margin:0; }
            .immediate-actions ol li { margin-bottom:0.6rem; line-height:1.45; }

            .emr-call button{
                background-color:#007bff; color:#fff; border:none; padding:0.75rem 1rem; border-radius:6px; cursor:pointer; width:auto;
            }
            .emr-call button:hover { background-color:#0056b3; }

            body { overflow-x:hidden; }

            /* Responsive breakpoints */
            @media (max-width: 1024px) {
                .fire-emergency-container{ padding:1.5rem; }
                .emergency-fire, .emr-types, .immediate-actions, .emr-call, .emr-tools{ padding:1.25rem; }
            }

            @media (max-width: 768px) {
                .fire-header { padding:0.75rem 1rem; }
                .fire-header-info h1 { font-size:1rem; }
                .fire-header-subtitle { font-size:0.78rem; }

                .full-width-page { padding:1rem 0; }
                .fire-emergency-container { padding:1rem; max-width:100%; }

                .emergency-fire, .emr-types, .immediate-actions, .emr-call, .emr-tools{ padding:1rem; border-radius:8px; }
                .emergency-fire h2, .emr-types h3, .immediate-actions h3, .emr-call h3, .emr-tools h3{ font-size:1.05rem; }

                .emr-types ul, .emr-tools ul, .immediate-actions ol{ padding-left:1.2rem; font-size:0.95rem; }
                .emr-call button{ width:100%; padding:0.95rem; font-size:1rem; }
            }

            @media (max-width: 480px) {
                .fire-header { padding:0.5rem 0.75rem; gap:0.5rem; }
                .fire-header-info h1 { font-size:0.95rem; }
                .fire-header-subtitle { font-size:0.72rem; }

                .police-emergency-container { padding:0.75rem; }
                .emergency-police, .emr-types, .immediate-actions, .emr-call, .emr-tools{ padding:0.75rem; margin-bottom:0.9rem; }
                .emr-types ul li, .emr-tools ul li, .immediate-actions ol li{ margin-bottom:0.45rem; }
                .emr-call button{ padding:0.8rem; font-size:0.95rem; }
            }
        `}</style>

     

        <div className="full-width-page">
            <div className="fire-emergency-container">
                <div className="emergency-fire">
                    <button className="fire-back-button" onClick={onBack} aria-label="Back">
                <ArrowLeft size={16} />
            </button>
                    <h2>Fire Emergency</h2>
                    <p>In case of a fire emergency, call your nearby fire station immediately.</p>
                </div>

                <div className="emr-types">
                    <h3>Types of Fire Emergencies</h3>
                    <ul>
                        <li>House Fire</li>
                        <li>Forest Fire</li>
                        <li>Industrial Fire</li>
                        <li>Vehicle Fire</li>
                        <li>Electrical Fire</li>
                    </ul>
                </div>

                <div className="immediate-actions">
                    <h3>Immediate Actions to Take</h3>
                    <ol>
                        <li>Ensure your safety and the safety of others.</li>
                        <li>Call the fire emergency number.</li>
                        <li>Provide clear information about the situation.</li>
                        <li>Follow the instructions given by the dispatcher.</li>
                    </ol>
                </div>

                <div className="emr-call">
                    <h3>Emergency call 101/112</h3>
                    <button>Call Now</button>
                </div>

                <div className="emr-tools">
                    <h3>Tools for Fire Emergencies</h3>
                    <ul>
                        <li>Quick Incident Reporting form</li>
                        <li>Upload photos/ videos (optional)</li>
                        <li>FIR/ Complaint guidance</li>
                        <li>Women & Child helpline</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};