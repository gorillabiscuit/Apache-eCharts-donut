import './App.css'
import MultiPie from './components/MultiPie'

function App() {
  return (
    <div style={{ padding: 16, background: '#221E37', minHeight: '100vh' }}>
      <h2 style={{ color: '#BBB' }}>阅读书籍分布</h2>
      <MultiPie />
    </div>
  )
}

export default App
