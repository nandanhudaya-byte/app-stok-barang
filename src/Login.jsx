import { useState } from 'react'
import { supabase } from './supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [pesan, setPesan] = useState('')

  const handleSubmit = async () => {
    setPesan('')
    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setPesan('Gagal: ' + error.message)
      else setPesan('Registrasi berhasil! Silakan login.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setPesan('Gagal: ' + error.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '8px 20px' }}>
        {isRegister ? 'Daftar' : 'Masuk'}
      </button>
      <p style={{ marginTop: '10px', color: 'red' }}>{pesan}</p>
      <p
        onClick={() => setIsRegister(!isRegister)}
        style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
      >
        {isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Register'}
      </p>
    </div>
  )
}

export default Login