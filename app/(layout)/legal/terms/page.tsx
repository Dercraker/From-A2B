import { Layout, LayoutContent } from "@components/page/layout";
import { combineWithParentMetadata } from "@lib/metadata";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export const generateMetadata = combineWithParentMetadata({
  title: "Terms",
  description: "Terms of service",
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

const markdown = `## **Terms of Service**  

**Effective Date:** 3/13/2025  

Welcome to **From-A2B**! By using our services, you agree to these Terms of Service.  

### **1. Service Description**  
From-A2B provides an online platform to plan and manage travel itineraries.  

### **2. User Account**  
- You must provide accurate information and keep your login credentials secure.  
- We reserve the right to suspend accounts that violate these terms.  

### **3. Acceptable Use**  
- You may not use From-A2B for illegal or unauthorized activities.  
- Misuse of the platform may lead to account termination.  

### **4. Limitation of Liability**  
From-A2B is provided "as is". We are not responsible for inaccurate travel data or third-party service failures.  

### **5. Changes to Terms**  
We may update these Terms. Continued use of From-A2B after updates means you accept the changes.  

### **6. Contact**  
For any questions, reach out to **contact@from-a2b.com**.`;
