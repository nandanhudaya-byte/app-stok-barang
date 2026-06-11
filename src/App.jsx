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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-10 px-4">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          📦 App Stok Barang
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tambah Barang</h2>
          <input
            placeholder="Nama barang"
            value={nama}
            onChange={e => setNama(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Harga"
            value={harga}
            onChange={e => setHarga(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Stok"
            value={stok}
            onChange={e => setStok(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={tambahBarang}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Tambah Barang
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Daftar Barang</h2>

        {barang.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow p-5 mb-4">
            {editId === item.id ? (
              <div>
                <input value={editNama} onChange={e => setEditNama(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <input value={editHarga} onChange={e => setEditHarga(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <input value={editStok} onChange={e => setEditStok(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <div className="flex gap-2">
                  <button onClick={simpanEdit} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition">Simpan</button>
                  <button onClick={() => setEditId(null)} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg transition">Batal</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.nama}</p>
                  <p className="text-gray-500">Harga: Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                  <p className="text-gray-500">Stok: {item.stock}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => mulaiEdit(item)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition">Edit</button>
                  <button onClick={() => hapusBarang(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition">Hapus</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App