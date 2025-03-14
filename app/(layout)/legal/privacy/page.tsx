import { Layout, LayoutContent } from "@components/page/layout";
import { combineWithParentMetadata } from "@lib/metadata";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export const generateMetadata = combineWithParentMetadata({
  title: "Privacy",
  description: "Privacy policy",
});

export default function page() {
  return (
    <Layout>
      <LayoutContent className="prose m-auto mb-8 dark:prose-invert">
        <MDXRemote source={markdown} />
      </LayoutContent>
    </Layout>
  );
}

const markdown = `## **Privacy Policy**  

**Effective Date:** 3/13/2025  

Welcome to **From-A2B**. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when using our services.  

### **1. Data Collection**  
We collect the following types of data:  
- **Account Information:** Name, email address, and password.  
- **Trip Data:** Itinerary details, destinations, and notes.  
- **Technical Data:** Device information, IP address, and cookies.  

### **2. Use of Data**  
Your data is used to:  
- Provide and improve the **From-A2B** services.  
- Customize your user experience.  
- Ensure security and prevent fraud.  

### **3. Data Sharing**  
We do not sell your personal data. Data may be shared with third-party service providers only for essential functionalities (e.g., hosting, analytics).  

### **4. Security & Storage**  
We implement security measures to protect your data. However, no online service is 100% secure. Your data may be stored on servers located in [Specify Locations].  

### **5. User Rights**  
You have the right to:  
- Access, modify, or delete your data.  
- Request data portability.  
- Withdraw consent for certain data processing activities.  

### **6. Contact**  
For any privacy concerns, contact us at **contact@from-a2b.com**.`;
