import Navbar from "~/components/Navbar";
import {type FormEvent, useState} from "react";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

export const meta = () => (
    [
        {title:'Resumind | Upload'},
        {name:'description', content:"Upload resume"}
    ]
)

const Upload = () => {
    const {auth, isLoading, fs,ai,kv} = usePuterStore()
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file:File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({companyName, jobTitle,jobDescription, file}:{
        companyName:string,
        jobTitle:string,
        jobDescription:string,
        file: File
    }) => {
        setIsProcessing(true)
        setStatusText("Uploading the file ...")
        const uploadedFile = await fs.upload([file])
        if(!uploadedFile) return setStatusText("Error,Upload failed!")
        setStatusText('Converting to image...')
        const imageFile = await convertPdfToImage(file)

        if(!imageFile.file) return setStatusText("Error,Failed to convert pdf to image")

        setStatusText("Uploading the image...")

        const uploadedImage = await fs.upload([imageFile.file])

        if(!uploadedImage) return setStatusText("Error: failed to upload image...")

        setStatusText("Preparing data....")

        const uuid = generateUUID()

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback:"",
        }

        await kv.set(`resume ${uuid}`, JSON.stringify(data))

        setStatusText("Analyzing...")

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        )

        if(!feedback) return setStatusText(`Failed to analyze resume`)

        const feedbackText = typeof feedback.message.content === 'string' ?
            feedback.message.content
            : feedback.message.content[0].text

        data.feedback = JSON.parse(feedbackText)

        await kv.set(`resume:${uuid}`, JSON.stringify(data))

        setStatusText('Analysis complete! Redirecting...')

        navigate(`/resume/${uuid}`)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if(!form) return

        const formData = new FormData(form)
        const companyName = formData.get('company-name') as string
        const jobTitle = formData.get('job-title') as string
        const jobDescription = formData.get('job-description') as string

        if(!file) return
        handleAnalyze({companyName,jobTitle,jobDescription,file})
    }

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
                            <FileUploader
                                onFileSelect={handleFileSelect}
                            />
                        </div>
                        <button className={'primary-button'} type={'submit'}>Analyze resume</button>
                    </form>
                )}
            </section>
        </main>
    )
}
export default Upload
