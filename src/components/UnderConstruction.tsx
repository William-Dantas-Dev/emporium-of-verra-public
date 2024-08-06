const UnderConstruction = ({ page }: {
  page: String
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-opacity-50 text-black">
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">Pagina {page} Em Desenvolvimento</h2>
        <p className="text-lg text-gray-600">
          Esta página ainda está em desenvolvimento. Por favor, volte mais tarde para ver o conteúdo completo.
        </p>
        <div className="flex justify-center mt-4">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="12"/>
          </svg>
        </div>
      </div>
    </div>
  )
  
}

export default UnderConstruction;