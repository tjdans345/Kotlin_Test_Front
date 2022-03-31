const input = (props) => {
  // props : app.js 에 있는 속성을 input 으로 받아오기 위해 props를 사용함
  return (
    <form onSubmit={props.handleSubmit} method="POST">
      <label>
        Todo &nbsp;
        <input
          type="text"
          required={true}
          value={props.input}
          onChange={props.handleChange}
        />
      </label>
      <input type="submit" value="Create" />
    </form>
  );
};

export default input;
