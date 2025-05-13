### 🧠 Pie Scanner API

Analyze any website and get AI-powered insights into problems, solutions, and more — via a single GET call.

---

### 🔗 Endpoint

```
GET https://api.piesolutions.ai/api/scan
```

---

### 🧾 Query Parameters

| Parameter | Required | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `website` | ✅ Yes    | Full URL of the website to scan (must start with `https://`) |
| `prompt`  | ✅ Yes    | Custom prompt to guide the AI analysis (must be URL-encoded) |

---

### 📥 Example Request

```bash
curl "https://api.piesolutions.ai/api/scan?website=https://novaqore.tech&prompt=what%20do%20they%20do"
```

---

### ✅ Example Prompt Ideas

* `prompt=List%205%20problems%20with%20this%20site%20and%20suggest%20solutions`
* `prompt=What%20does%20this%20business%20do%3F%20Summarize%20it%20in%201%20sentence`
* `prompt=How%20can%20they%20improve%20their%20homepage%20design%3F`

---

### 📦 Example JSON Response

```json
{
  "result": {
    "0": {
      "problem": "Unclear value proposition on homepage.",
      "solution": "Add a concise headline explaining the product and who it helps."
    },
    "1": {
      "problem": "No visible call-to-action above the fold.",
      "solution": "Add a prominent 'Get Started' or 'Contact Us' button in the header."
    }
    // ...
  }
}
```