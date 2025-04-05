import React, { useState } from 'react';
import { Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react';

interface PredictionInputs {
  temperature: number;
  humidity: number;
  windSpeed: number;
  drought: number;
}

function App() {
  const [inputs, setInputs] = useState<PredictionInputs>({
    temperature: 25,
    humidity: 45,
    windSpeed: 15,
    drought: 50,
  });

  const calculateRiskLevel = (inputs: PredictionInputs): { level: string; color: string } => {
    const riskScore = 
      (inputs.temperature / 50) * 0.3 + 
      (1 - inputs.humidity / 100) * 0.3 + 
      (inputs.windSpeed / 100) * 0.2 + 
      (inputs.drought / 100) * 0.2;

    if (riskScore > 0.7) return { level: 'Extreme', color: 'text-red-600' };
    if (riskScore > 0.5) return { level: 'High', color: 'text-orange-500' };
    if (riskScore > 0.3) return { level: 'Moderate', color: 'text-yellow-500' };
    return { level: 'Low', color: 'text-green-500' };
  };

  const risk = calculateRiskLevel(inputs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold text-center">Forest Fire Prediction System</h1>
          <p className="text-gray-400 mt-2">Advanced risk assessment and early warning system</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Parameters */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Environmental Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  Temperature (°C)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={inputs.temperature}
                  onChange={(e) => setInputs({ ...inputs, temperature: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-400"
                />
                <span className="text-sm text-gray-400">{inputs.temperature}°C</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  Humidity (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.humidity}
                  onChange={(e) => setInputs({ ...inputs, humidity: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
                <span className="text-sm text-gray-400">{inputs.humidity}%</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-gray-400" />
                  Wind Speed (km/h)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.windSpeed}
                  onChange={(e) => setInputs({ ...inputs, windSpeed: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-400"
                />
                <span className="text-sm text-gray-400">{inputs.windSpeed} km/h</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Drought Index (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.drought}
                  onChange={(e) => setInputs({ ...inputs, drought: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <span className="text-sm text-gray-400">{inputs.drought}%</span>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Risk Assessment</h2>
            
            <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
              <div className="text-center mb-8">
                <div className="text-7xl font-bold mb-4">
                  <span className={risk.color}>{risk.level}</span>
                </div>
                <p className="text-gray-400 text-xl">Fire Risk Level</p>
              </div>

              <div className="w-full max-w-md bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3 text-gray-300">
                  {risk.level === 'Extreme' && (
                    <div className="space-y-2">
                      <p>Evacuate immediately if instructed by authorities. Monitor emergency broadcasts continuously and prepare for immediate action. Keep emergency supplies readily accessible.</p>
                    </div>
                  )}
                  {risk.level === 'High' && (
                    <div className="space-y-2">
                      <p>Stay alert and prepared for potential evacuation. Keep emergency supplies ready and monitor local news for updates. Review your evacuation plan with family members.</p>
                    </div>
                  )}
                  {risk.level === 'Moderate' && (
                    <div className="space-y-2">
                      <p>Review your evacuation plans and ensure clear surrounding vegetation. Stay informed about weather conditions and maintain awareness of local fire alerts.</p>
                    </div>
                  )}
                  {risk.level === 'Low' && (
                    <div className="space-y-2">
                      <p>Maintain regular precautions and keep emergency contacts updated. Check equipment readiness and stay informed about weather conditions.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>This is a simplified prediction model for demonstration purposes.</p>
          <p>For actual emergencies, always follow official guidance and emergency services.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;