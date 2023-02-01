
import { useFormik } from 'formik'


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
        <form id = "feedback_form" onSubmit={formikRegister.handleSubmit} style={{width: '400px', height: '100%', margin: 'auto', background: 'white'}} >
            <h2 style={{margin:"auto"}}>Feedback</h2>
            <br/>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} name="Email" id="Email" placeholder="Enter your email" style={{width: '400',borderRadius:"10px", height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} name="Subject" id="Subject" placeholder="Subject" style={{width: '400',borderRadius:"10px", height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
              <textarea type="textarea" className="form-control" onChange={formikRegister.handleChange} name="Body" id="Body" placeholder="Enter details" style={{width: '400',borderRadius:"10px", height: '300px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <button className='btn-success' style={{width:"100px", height:"30px",borderRadius:"10px"}}>Submit</button>
            </form>
    )
} 

export default ContactUs