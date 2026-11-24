import Header from '../componentes/Header';

const handleLogin = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const user = form.elements.user.value.trim();
    const senha = form.elements.senha.value.trim();

    alert(`Dados recuperados:\n Usuário: ${user}\nSenha: ${senha}`);
}

const Login = () => {

    return (
        <>
        <Header gestao />
        <main className='page narrow'>
            <form className='form-card form2 form-login' onSubmit={handleLogin} style={{width: "50%", justifySelf: "center"}}>
            <div>
                <div className='mb10'><label for="user">Usuário</label><br /> <input type="text" name='user'/></div>
                <div><label for="senha">Senha</label><br /> <input type="text" name='senha'/></div><br />
                <div><button className='primary-btn' type='submit'>Autenticar</button></div>
            </div>
            </form>
        </main>
        </>
    )
}

export default Login;