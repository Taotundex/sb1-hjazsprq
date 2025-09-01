'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink } from 'lucide-react';

interface ApiEndpoint {
  title: string;
  description: string;
  endpoint: string;
  method: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response: string;
}

export default function ApiSection() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiEndpoints: ApiEndpoint[] = [
    {
      title: 'Chart Data',
      description: 'קבלת נתוני תרשים לוח למחרת תחפים',
      endpoint: '/api/v1/charts/data',
      method: 'GET',
      parameters: [
        { name: 'chart_type', type: 'string', required: true, description: 'סוג התרשים' },
        { name: 'date_from', type: 'date', required: false, description: 'תאריך התחלה' },
        { name: 'date_to', type: 'date', required: false, description: 'תאריך סיום' },
        { name: 'region', type: 'string', required: false, description: 'אזור גיאוגרפי' }
      ],
      response: `{
  "status": "success",
  "data": {
    "chart_type": "line",
    "dates": ["2024-01-01", "2024-01-02"],
    "series": [
      {
        "name": "Solar Data",
        "data": [100, 150],
        "unit": "MW"
      }
    ],
    "metadata": {
      "total_records": 2,
      "last_updated": "2024-01-01T12:00:00Z"
    }
  }
}`
    },
    {
      title: 'Chart Info',
      description: 'קבלת מידע על תרשים נכדף חירותי',
      endpoint: '/api/v1/charts/info',
      method: 'GET',
      parameters: [
        { name: 'chart_id', type: 'string', required: true, description: 'מזהה התרשים' }
      ],
      response: `{
  "id": "chart_001",
  "title": "Solar Generation",
  "description": "Daily solar power generation",
  "data_source": "National Grid",
  "update_frequency": "Daily",
  "last_updated": "2024-01-01T12:00:00Z"
}`
    },
    {
      title: 'Chart List',
      description: 'קבלת רשימת כל התרשימים הזמינים',
      endpoint: '/api/v1/charts',
      method: 'GET',
      parameters: [
        { name: 'category', type: 'string', required: false, description: 'קטגוריית תרשים' },
        { name: 'limit', type: 'integer', required: false, description: 'מספר תוצאות מקסימלי' }
      ],
      response: `{
  "charts": [
    {
      "id": "renewable_capacity",
      "title": "Renewable Energy Capacity",
      "category": "renewable",
      "available_regions": ["north", "center", "south"]
    }
  ],
  "total": 1
}`
    },
    {
      title: 'Regional Data',
      description: 'קבלת נתונים פי אזור',
      endpoint: '/api/v1/regions/{region_id}',
      method: 'GET',
      parameters: [
        { name: 'region_id', type: 'string', required: true, description: 'מזהה אזור' }
      ],
      response: `{
  "region_id": "north",
  "region_name": "North Region",
  "data": {
    "renewable_capacity": 500,
    "co2_emissions": 1200,
    "energy_consumption": 2500
  },
  "last_updated": "2024-01-01T12:00:00Z"
}`
    },
    {
      title: 'Time Series Data',
      description: 'קבלת נתוני גיד זמן',
      endpoint: '/api/v1/timeseries',
      method: 'GET',
      parameters: [
        { name: 'metric', type: 'string', required: true, description: 'סוג המדד' },
        { name: 'start_date', type: 'date', required: true, description: 'תאריך התחלה' },
        { name: 'end_date', type: 'date', required: true, description: 'תאריך סיום' },
        { name: 'granularity', type: 'string', required: false, description: 'רזולוציית זמן' }
      ],
      response: `{
  "metric": "solar_generation",
  "unit": "MW",
  "granularity": "daily",
  "data_points": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "value": 150.5
    }
  ]
}`
    },
    {
      title: 'Export Data',
      description: 'יצוא נתונים לקובץ',
      endpoint: '/api/v1/export',
      method: 'POST',
      parameters: [
        { name: 'data_type', type: 'string', required: true, description: 'סוג הנתונים לייצוא' },
        { name: 'format', type: 'string', required: true, description: 'פורמט הקובץ (CSV/XLSX)' },
        { name: 'date_range', type: 'object', required: false, description: 'טווח תאריכים' }
      ],
      response: `{
  "export_id": "exp_123",
  "download_url": "https://api.example.com/downloads/exp_123.csv",
  "expires_at": "2024-01-01T18:00:00Z",
  "file_size": 1024
}`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-l from-yellow-100 to-blue-100 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">API</h1>
        <p className="text-lg text-slate-600 mb-4">
          ממש על הדברים הכי ציבור להכנסת נתונים חיכול קמוס עליכם השמש ומקודש שלמה API משותף.
        </p>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Base URL: https://api.openenergy.gov.il/v1
          </Button>
          <Badge variant="outline">v1.0</Badge>
        </div>
      </div>

      {/* API Documentation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">תיעוד שירותי API</h2>
        <p className="text-slate-600">
          השרותים API מאפשרים גישה קצה של נתונים וסטטיסטיקה של שיתופי שירותי אנרגיה.
        </p>

        {/* Endpoints Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-right p-3 font-semibold">נקודת קצה</th>
                <th className="text-right p-3 font-semibold">שיטת HTTP / חיכרי</th>
                <th className="text-right p-3 font-semibold">תיאור</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((endpoint, index) => (
                <tr key={index} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-3">
                    <code className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded">
                      {endpoint.endpoint}
                    </code>
                  </td>
                  <td className="p-3">
                    <Badge 
                      variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                      className={endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                    >
                      {endpoint.method}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-600">{endpoint.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed API Documentation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">נקודות תהליכים</h3>
          
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{endpoint.title}</CardTitle>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.endpoint, endpoint.endpoint)}
                    >
                      {copiedEndpoint === endpoint.endpoint ? '✓ הועתק' : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-slate-600">{endpoint.description}</p>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Badge 
                    variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                    className={endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded">
                    {endpoint.endpoint}
                  </code>
                </div>
              </CardHeader>
              <CardContent>
                {/* Parameters */}
                {endpoint.parameters.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">פרמטרים:</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-center space-x-4 space-x-reverse text-sm">
                          <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">
                            {param.name}
                          </code>
                          <Badge variant="outline" className={param.required ? 'border-red-300 text-red-700' : 'border-slate-300'}>
                            {param.type}
                          </Badge>
                          {param.required && <Badge variant="destructive" className="text-xs">חובה</Badge>}
                          <span className="text-slate-600">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Response Example */}
                <div>
                  <h4 className="font-medium mb-2">דוגמת תגובה:</h4>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{endpoint.response}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Usage Notes */}
        <Card>
          <CardHeader>
            <CardTitle>הערות שימוש</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">זמי מסירה:</h4>
              <p className="text-slate-600 text-sm">
                כל הקריאות מוגבלות ל-1000 בקשות לשעה. בקשות נוספות יוחזרו עם קוד שגיאה 429.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">אימות:</h4>
              <p className="text-slate-600 text-sm">
                הרשמה אינה נדרשת עבור נקודות קצה ציבוריות. עבור נתונים מתקדמים, נדרש מפתח API.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">פורמט תגובה:</h4>
              <p className="text-slate-600 text-sm">
                כל התגובות מוחזרות בפורמט JSON עם קידוד UTF-8. תאריכים מוחזרים בפורמט ISO 8601.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}