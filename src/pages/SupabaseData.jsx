import { useMemo, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/useAuth';

const DEFAULT_TABLE = import.meta.env.VITE_SUPABASE_TEST_TABLE || 'profiles';

export default function SupabaseData() {
  const { user } = useAuth();
  const [tableName, setTableName] = useState(DEFAULT_TABLE);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Tekan tombol Cek Data untuk membaca tabel Supabase.');

  const userLabel = useMemo(() => {
    return user?.user_metadata?.full_name || user?.email || user?.id || 'Signed in user';
  }, [user]);

  const loadRows = async (event) => {
    event?.preventDefault();
    const cleanTableName = tableName.trim();

    if (!isSupabaseConfigured) {
      setMessage('Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.local dulu.');
      setRows([]);
      setColumns([]);
      return;
    }

    if (!cleanTableName) {
      setMessage('Nama tabel tidak boleh kosong.');
      setRows([]);
      setColumns([]);
      return;
    }

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase
      .from(cleanTableName)
      .select('*')
      .limit(20);

    if (error) {
      setRows([]);
      setColumns([]);
      setMessage(error.message);
    } else {
      const nextRows = data || [];
      setRows(nextRows);
      setColumns(nextRows[0] ? Object.keys(nextRows[0]) : []);
      setMessage(nextRows.length ? `Berhasil membaca ${nextRows.length} baris dari tabel ${cleanTableName}.` : `Tabel ${cleanTableName} terbaca, tapi belum ada data yang bisa ditampilkan.`);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f1eadb] px-5 py-14 text-[#231f1a] md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-azeret text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Supabase Backend
            </p>
            <h1 className="mt-2 font-concert text-4xl leading-tight text-[#231f1a] md:text-6xl">
              Data Check
            </h1>
            <p className="mt-3 max-w-2xl font-akshar text-lg text-[#5c5146]">
              Kamu sudah login sebagai <span className="font-semibold text-[#231f1a]">{userLabel}</span>. Gunakan halaman ini untuk memastikan auth dan akses tabel Supabase berjalan.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 bg-white/70 px-4 py-3 font-azeret text-xs text-[#5c5146]">
            {isSupabaseConfigured ? 'Supabase env aktif' : 'Supabase env belum diisi'}
          </div>
        </div>

        <form onSubmit={loadRows} className="mb-6 flex flex-col gap-3 md:flex-row">
          <label className="flex-1">
            <span className="mb-2 block font-azeret text-xs font-bold uppercase tracking-[0.18em] text-[#5c5146]">
              Nama Tabel
            </span>
            <input
              value={tableName}
              onChange={(event) => setTableName(event.target.value)}
              placeholder="profiles"
              className="h-12 w-full rounded-md border border-black/15 bg-white px-4 font-akshar text-lg text-[#231f1a] outline-none transition-colors focus:border-accent"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-auto h-12 rounded-md bg-accent px-6 font-azeret text-sm font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Cek Data'}
          </button>
        </form>

        {message && (
          <p className="mb-5 rounded-md border border-black/10 bg-white px-4 py-3 font-akshar text-base text-[#5c5146]">
            {message}
          </p>
        )}

        <div className="overflow-hidden rounded-md border border-black/10 bg-white shadow-sm">
          {rows.length && columns.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[#231f1a] text-white">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="px-4 py-3 font-azeret text-xs uppercase tracking-[0.12em]">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id || index} className="border-t border-black/10">
                      {columns.map((column) => (
                        <td key={column} className="max-w-[280px] px-4 py-3 align-top font-akshar text-base text-[#3a332c]">
                          <span className="line-clamp-3 break-words">
                            {typeof row[column] === 'object' && row[column] !== null
                              ? JSON.stringify(row[column])
                              : String(row[column] ?? '')}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center font-akshar text-lg text-[#5c5146]">
              Belum ada baris data untuk ditampilkan.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
