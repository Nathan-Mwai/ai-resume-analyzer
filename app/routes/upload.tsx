import Navbar from "~/components/Navbar";
import {type FormEvent, useState} from "react";

export const meta = () => (
    [
        {title:'Resumind | Upload'},
        {name:'description', content:"Log into your account"}
    ]
)

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}
    return (
        <main className={`bg-[url('/images/bg-main.svg')] bg-cover`}>
            <Navbar />

            <section className="main-section">
                <div className={'page-heading py-16'}>
                    <h1>Smart Feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img
                                src={"/images/resume-scan.gif"}
                                className={'w-full'}
                            />
                        </>
                    ):(
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )
                    }
                </div>
                {!isProcessing &&(
                    <form id={'upload-form'} className={'flex flex-col gap-4 mt-8'} onSubmit={handleSubmit}>
                        <div className={'form-div'}>
                            <label htmlFor={'company-name'}>Company Name</label>
                            <input type='text' name="company-name" placeholder='Company Name' id="company-name" />
                        </div>
                        <div className={'form-div'}>
                            <label htmlFor={'job-title'}>Job Title</label>
                            <input type='text' name="job-title" placeholder='job Title' id="job-title" />
                        </div>
                        <div className={'form-div'}>
                            <label htmlFor={'job-description'}>Job Description</label>
                            <textarea rows={5} name="job-description" placeholder='job Description' id="job-description" />
                        </div>
                        <div className={'form-div'}>
                            <label htmlFor={'uploader'}>Upload Resume</label>
                            <div>Uploader</div>
                        </div>
                        <button className={'primary-button'} type={'submit'}>Analyze resume</button>
                    </form>
                )}
            </section>
        </main>
    )
}
export default Upload
