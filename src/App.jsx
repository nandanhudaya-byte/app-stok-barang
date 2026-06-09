import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY

function App() {
  const [barang, setBarang] = useState([])
  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState('')
  const [stok, setStok] = useState('')

  useEffect(() => {
    fetchBarang()
  }, [])

  async function fetchBarang() {
    const { data } = await supabase.from('barang').select('*')
    setBarang(data || [])
  }

  async function tambahBarang() {
    if (nama === '' || harga === '' || stok === '') return
    await supabase.from('barang').insert([{ nama, harga, stock: stok }])
    setNama('')
    setHarga('')
    setStok('')
    fetchBarang()
  }

  async function hapusBarang(id) {
    await supabase.from('barang').delete().eq('id', id)
    fetchBarang()
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📦 App Stok Barang</h1>
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Tambah Barang</h2>
        <input placeholder="Nama barang" value={nama} onChange={(e) => setNama(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input placeholder="Harga" value={harga} onChange={(e) => setHarga(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input placeholder="Stok" value={stok} onChange={(e) => setStok(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <button onClick={tambahBarang} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Tambah Barang
        </button>
      </div>
      <h2>Daftar Barang</h2>
      {barang.length === 0 && <p>Belum ada barang.</p>}
      {barang.map((b) => (
        <div key={b.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{b.nama}</strong>
            <p style={{ margin: '5px 0' }}>Harga: Rp {b.harga}</p>
            <p style={{ margin: '5px 0' }}>Stok: {b.stock}</p>
          </div>
          <button onClick={() => hapusBarang(b.id)} style={{ padding: '8px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Hapus
          </button>
        </div>
      ))}
    </div>
  )
}

export default App