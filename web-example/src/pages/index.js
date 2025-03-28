import { useEffect, useState } from 'react';

const Home = () => {
  const [buildInfo, setBuildInfo] = useState(null);
  const [wasm, setWasm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Import the WASM module dynamically
        const wasmModule = await import('@etospheres/etopay-sdk-wasm-web');

        // Ensure it initializes correctly
        await wasmModule.default();
        setWasm(wasmModule);

        // Initialize the ETOPaySdk instance
        const sdk = new wasmModule.ETOPaySdk();

        // Get build info
        const sdkBuildInfo = sdk.getBuildInfo();
        console.log(sdkBuildInfo);
        setBuildInfo(sdkBuildInfo);

      } catch (err) {
        setError('Error loading SDK: ' + err.message);
        console.error('Error loading SDK:', err);
      }
    };

    loadWasm();
  }, []);

  return (
    <div>
      <h1>Build Information</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {buildInfo ? (
        <pre>{JSON.stringify(buildInfo, null, 2)}</pre>
      ) : (
        <p>Loading build info...</p>
      )}
    </div>
  );
};

export default Home;
