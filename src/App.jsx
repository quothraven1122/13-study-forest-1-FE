import Modal2 from './component/Modal2/Modal2';

function App() {
  return (
    <>
      <Modal2
        title='연우의 개발공장'
        message='권한이 필요해요!'
        onSubmit={() => {}}
      >
        <p
          style={{
            color: '#414141',
            fontWeight: 600,
            fontSize: '18px',
            marginBottom: '16px',
          }}
        >
          비밀번호
        </p>
        <input
          placeholder='비밀번호를 입력해 주세요'
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '15px',
            border: '1px #DDD solid',
            padding: '0 20px',
          }}
        />
      </Modal2>
    </>
  );
}

export default App;
