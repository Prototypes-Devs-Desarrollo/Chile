 // const sendSmtpEmail = {
    //     // to: [
    //     //   {
    //     //     email: selectedQuestion.emailSender,
    //     //     name: selectedQuestion.sender
    //     //   }
    //     // ],
    //     // templateId: 2,
    //     // params: {
    //     //   pregunta: selectedQuestion.content.question,
    //     //   respuesta: selectedQuestion.content.answer
    //     // },
      
    //   };

import React from "react";
  
export const  useEmailSender = () =>{

const sendEmail = (sendSmtpEmail) =>{ 
      axios.post('https://api.sendinblue.com/v3/smtp/email', sendSmtpEmail, {
        headers: {
          'api-key': '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',
          'Content-Type': 'application/json',
          'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'

        }
      })
        .then(function (response) {
          setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== id));
        })
        .catch(function (error) {
          console.error('Error:', error);
        })
    } 
return {
    sendEmail
}
}