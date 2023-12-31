interface InputFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

const InputForm = ({handleSubmit}: InputFormProps) => {
  
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //    event.preventDefault();
    // }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" />
                <input name="completed" type="checkbox"  />
                <button>Submit</button>
            </form>
        </>
    )
}

export default InputForm