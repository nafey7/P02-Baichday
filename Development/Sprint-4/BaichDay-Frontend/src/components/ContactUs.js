
import { useFormik } from 'formik'
import Button from '@mui/material/Button';


function ContactUs(){
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.example.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: 'user',
    //       pass: 'password'
    //     }
    // });
    const formikRegister = useFormik({
        initialValues: {
          email: '',
          subject: '',
          body: ''
        },
        // onSubmit: values => {
        //     // Define email options
        // //     const mailOptions = {
        // //         from: 'baichday@outlook.com',
        // //         to: values.email,
        // //         subject: values.subject,
        // //         text: values.body'
        // //     };
            
        // //     // Send the email
        // //     transporter.sendMail(mailOptions, (error, info) => {
        // //         if (error) {
        // //         console.log(error);
        // //         } else {
        // //         console.log('Email sent: ' + info.response);
        // //         }
        // //     });
        // },
      });

    return(
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <form id = "feedback_form" onSubmit={formikRegister.handleSubmit}  style={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", width: "70%", height: "auto", padding: "4rem", whiteSpace: 'nowrap', overflow: 'auto', marginTop: '3%' }} >
            <h2 style={{fontSize:"50px"}}>Feedback</h2>
            <br/>
            <p style={{whiteSpace: "normal", wordWrap: "break-word", fontSize: '18px', textAlign: 'justify'}}>Welcome to our Contact Us page! We appreciate your interest in reaching out to us and would be happy to assist you in any way possible. If you have any questions, comments or suggestions, please do not hesitate to get in touch with us. We are committed to providing you with excellent service and will do our best to respond to your inquiry as quickly as possible.</p>
            <br/>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} name="Email" id="Email" placeholder="Enter your email" style={{width: '100%', borderRadius:"1px", height: '40px', paddingLeft: 'auto', fontSize: '15px'}}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} name="Subject" id="Subject" placeholder="Subject" style={{width: '100%', borderRadius:"1px", height: '40px', paddingLeft: 'auto', fontSize: '15px'}}/>
            </div>
            <div className="form-group">
              <textarea type="textarea" className="form-control" onChange={formikRegister.handleChange} name="Body" id="Body" placeholder="Enter details" style={{width: '100%',borderRadius:"1px", height: '20vh', paddingLeft: 'auto', fontSize: '15px'}}/>
            </div>
            <Button type="submit"  className='mt-5 btn' variant="contained" size='large' sx={{width:"100px", height:"40px", borderRadius:"1px", background: '#4BB543', fontSize: '1.7rem', padding: '1rem 2rem'}}>Submit</Button>
            </form>
            </div>
    )
} 

export default ContactUs