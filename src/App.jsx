import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function App() {
  const [barang, setBarang] = useState([])
  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState('')
  const [stok, setStok] = useState('')
  const [editId, setEditId] = useState(null)
  const [editNama, setEditNama] = useState('')
  const [editHarga, setEditHarga] = useState('')
  const [editStok, setEditStok] = useState('')

  useEffect(() => {
    fetchBarang()
  }, [])

  async function fetchBarang() {
    const { data } = await supabase.from('barang').select('*')
    setBarang(data || [])
  }

  async function tambahBarang() {
    if (!nama || !harga || !stok) return
    await supabase.from('barang').insert([{ nama, harga, stok }])
    setNama('')
    setHarga('')
    setStok('')
    fetchBarang()
  }

  async function hapusBarang(id) {
    await supabase.from('barang').delete().eq('id', id)
    fetchBarang()
  }

  function mulaiEdit(item) {
    setEditId(item.id)
    setEditNama(item.nama)
    setEditHarga(item.harga)
    setEditStok(item.stock)
  }

  async function simpanEdit() {
    await supabase.from('barang').update({
      nama: editNama,
      harga: editHarga,
      stock: editStok
    }).eq('id', editId)
    setEditId(null)
    fetchBarang()
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📦 App Stok Barang</h1>

      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>Tambah Barang</h2>
        <input placeholder="Nama barang" value={nama} onChange={e => setNama(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input placeholder="Harga" value={harga} onChange={e => setHarga(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input placeholder="Stok" value={stok} onChange={e => setStok(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <button onClick={tambahBarang} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px' }}>Tambah Barang</button>
      </div>

      <h2>Daftar Barang</h2>
      {barang.map(item => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
          {editId === item.id ? (
            <div>
              <input value={editNama} onChange={e => setEditNama(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }} />
              <input value={editHarga} onChange={e => setEditHarga(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }} />
              <input value={editStok} onChange={e => setEditStok(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }} />
              <button onClick={simpanEdit} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', marginRight: '8px' }}>Simpan</button>
              <button onClick={() => setEditId(null)} style={{ backgroundColor: 'gray', color: 'white', padding: '8px 16px' }}>Batal</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{item.nama}</strong>
                <p>Harga: Rp {item.harga}</p>
                <p>Stok: {item.stock}</p>
              </div>
              <div>
                <button onClick={() => mulaiEdit(item)} style={{ backgroundColor: 'orange', color: 'white', padding: '8px 16px', marginRight: '8px' }}>Edit</button>
                <button onClick={() => hapusBarang(item.id)} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px' }}>Hapus</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default App