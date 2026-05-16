// components/forms/ContactFormFields.jsx
import Input from "../../Input";
import Textarea from "../../Textarea";
import { useFormContext } from "react-hook-form";

const ContactFormFields = () => {
  const {} = useFormContext();

  return (
    <>
      <Input label="Name" name="name" placeholder="Enter your name" required={true} />
      <Input
        label="Contact No."
        name="phone"
        placeholder="Enter your phone number"
        required={true}
      />
      <Input
        label="Email"
        name="email"
        placeholder="Enter your email address"
        required={true}
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Enter your message here..."
        required={true}
      />
    </>
  );
};

export default ContactFormFields;