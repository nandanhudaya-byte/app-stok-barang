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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isRegister ? '📝 Register' : '🔐 Login'}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isRegister ? 'Daftar' : 'Masuk'}
        </button>
        {pesan && (
          <p className="mt-4 text-center text-red-500 text-sm">{pesan}</p>
        )}
        <p
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-center text-blue-500 text-sm cursor-pointer hover:underline"
        >
          {isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Register'}
        </p>
      </div>
    </div>
  )
}

export default Login