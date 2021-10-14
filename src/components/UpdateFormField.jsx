import styled from 'styled-components';
import PropTypes from 'prop-types';

const UpdateFormField = ({
  wannaEdit,
  htmlFor,
  heading,
  inputValue,
  type,
  inputName,
  handleInput,
  refObj,
  spanInnerText,
  numberInputMax,
  numberInputMin,
}) => (
  <Wrapper className='flex'>
    {wannaEdit ? (
      <div className='outer-div flex'>
        <div className='label-input-div flex'>
          <label htmlFor={htmlFor}>{heading}</label>

          <input
            id={htmlFor}
            value={inputValue}
            type={type}
            name={inputName}
            onChange={handleInput}
            max={numberInputMax}
            min={numberInputMin}
          />
        </div>

        <p ref={refObj} className='message' />
      </div>
    ) : (
      <>
        <h4>{heading}</h4>

        <span>{spanInnerText}</span>
      </>
    )}
  </Wrapper>
);

UpdateFormField.propTypes = {
  wannaEdit: PropTypes.bool.isRequired,
  htmlFor: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  refObj: PropTypes.object.isRequired,
  spanInnerText: PropTypes.string,
  numberInputMax: PropTypes.string,
  numberInputMin: PropTypes.string,
};

UpdateFormField.defaultProps = {
  numberInputMax: '100',
  numberInputMin: '0',
  spanInnerText: '',
  inputValue: 'XYZ',
};

const Wrapper = styled.div`
  padding: 0px 0 20px;
  justify-content: space-between !important;

  h4 {
    font-size: 1em;
    color: #dfdfdf;
    letter-spacing: 2px;
    border: 1px solid red;
  }

  span {
    font-size: 1em;
    color: #fafafa;
    letter-spacing: 1px;
    display: block;
    width: 50%;
  }

  .outer-div {
    flex-direction: column;
    width: 100%;
    align-items: flex-end;

    p {
      transition: all 0.5s ease;
      height: 0;
      width: 0;
      overflow: hidden;
    }
  }

  .label-input-div {
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    flex-direction: column;

    label {
      font-size: 1em;
      color: #fcfcfc;
      letter-spacing: 2px;
      font-weight: bold;
      font-weight: 400;
      padding: 5px 0 8px;
      /* border: 1px solid red; */
    }

    input,
    select {
      padding: 5px 10px;
      font-size: 0.9em;
      width: 50%;
      width: 100%;
      color: #2c2c2c;
    }
  }

  .message.success,
  .message.error {
    height: auto;
    width: auto;
  }

  @media screen and (max-width: 511px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 30px;

    h4 {
      font-size: 1.2em;
      margin-bottom: 5px;
    }
    .outer-div {
      align-items: flex-start;
    }
    .label-input-div {
      flex-direction: column;
      align-items: flex-start;
      label {
        padding: 5px 0;
      }
      input {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 341px) {
    padding: 0 0 27px;
  }
`;

export default UpdateFormField;
