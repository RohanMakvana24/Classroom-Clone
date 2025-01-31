import nodemailer from 'nodemailer';

export const sendMail = async (toEmail , subject , htmlContent , res)=>{
    try {
        let transporter = nodemailer.createTransport({
            host : 'smtp-relay.brevo.com',
            port : 587,
            secure : false,
            auth:{
                user: "7888f4003@smtp-brevo.com",
                pass: "IhK0HYkaJAXBmbxU"
            }
        })

        let info = await transporter.sendMail({
            from : 'rohanmakvana90@gmail.com',
            to : toEmail,
            subject : subject,
            html : htmlContent
        })

        console.log("Email Send Succefully");
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : "Email Sending Error"
        })
    }
}

export default sendMail;