import React from "react";
import { useSelector } from "react-redux";
import { Input, TextArea } from "../UI";

const CreateForm = (props) => {
  const {
    title,
    body,
    description,
    setBody,
    setDescription,
    setTitle,
    formSubmit,
  } = props;
  const { isLoading } = useSelector((state) => state.article);
  return (
    <>
      <form onSubmit={formSubmit}>
        <Input label={"Title"} state={title} setState={setTitle} />
        <TextArea
          label={"Description"}
          state={description}
          setState={setDescription}
        />
        <TextArea
          label={"Body"}
          state={body}
          setState={setBody}
          height={"300px"}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreateForm;
