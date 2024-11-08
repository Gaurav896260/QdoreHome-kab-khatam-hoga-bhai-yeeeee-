import React from "react";
import Navbar from '../components/Navbar/Navbar.jsx'; // Import your Navbar component
import Footer from '../components/Footer/Footer.jsx';  // Assuming you have a Footer component

const TermsAndConditions = () => {
  return (
    <div>
      <Navbar /> 
      <div className="max-w-7xl container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Terms & Conditions</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. GENERAL</h2>
            <p className="mt-2">
              1.1. These Terms & Conditions apply to products purchased via www.qdorehome.com or placed through Social Media, or offline on phone or chat or through our Customer Service Team which are all assets of Qdore Home, company owning and operating www.qdorehome.com.
            </p>
            <p className="mt-2">
              1.2. PLEASE READ THE TERMS & CONDITIONS CAREFULLY BEFORE PURCHASING ANY PRODUCTS OR AVAILING ANY SERVICES ON ANY ASSET OF NESTROOTS. ANY PURCHASE MADE BY YOU THROUGH THE WEBSITE OR THROUGH ANY OTHER ASSET SHALL SIGNIFY YOUR ACCEPTANCE OF THE SUPPLY TERMS AND YOUR AGREEMENT TO BE LEGALLY BOUND BY THE SAME. IN ADDITION TO THE FOREGOING, YOU SHALL ALSO BE BOUND BY THE TERMS OF USE OF THE WEBSITE, PRIVACY POLICY, TERMS BY THE VENDOR OR ADDITIONAL TERMS OF SERVICE WHICH ARE DISPLAYED WITH THE SELECTION OF THE PRODUCT, IF ANY ("ADDITIONAL TERMS"). IF THERE IS ANY CONFLICT BETWEEN THE SUPPLY TERMS AND THE ADDITIONAL TERMS, THE ADDITIONAL TERMS SHALL TAKE PRECEDENCE IN RELATION TO THAT SALE.
            </p>
            <p className="mt-2">
              1.3. IF YOU DO NOT AGREE WITH THE SUPPLY TERMS, PLEASE DO NOT ACCESS THE WEBSITE OR ANY OTHER ASSET FOR ANY PURCHASE OR SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. BUSINESS</h2>
            <p className="mt-2">
              2.1. The websites are a platform that facilitate the online sale and purchase of merchandise and services ("Services") offered by third party vendors and service providers ("Vendor/s"). Title to the merchandise (“Products”) will pass directly from the Vendors to you.
            </p>
            <p className="mt-2">
              2.2. qdorehome.com has the right to change or discontinue any service at any time, without notice. qdorehome.com may add or modify the procedures, modes, processes or conditions of purchase at any time. qdorehome.com shall not be liable to you or to any third party for any modification, suspension or discontinuance of any aspect of the services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. PRODUCT</h2>
            <p className="mt-2">
              3.1. qdorehome.com enables the sale of a variety of products. Shipping for all the products on the website shall be per the company's policy, which may be changed by qdorehome.com from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. SERVICES</h2>
            <p className="mt-2">
              4.1. You should take all responsibility for your own actions in utilizing the products purchased by you; qdorehome.com shall not be liable for any such action.
            </p>
            <p className="mt-2">
              4.2. You represent that you are of legal age to form a binding contract and are not a person barred from receiving services under the laws as applicable in India.
            </p>
            <p className="mt-2">
              4.3. qdorehome.com shall not be responsible for any deficiency in payment of consideration payable towards the products purchased on the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. PRICING INFORMATION</h2>
            <p className="mt-2">
              5.1. The pricing information relating to the product shall be as disclosed to you at the time of your purchase.
            </p>
            <p className="mt-2">
              5.2. qdorehome.com does not guarantee that the price will be the lowest in the city, region or geography. Prices and availability are subject to change without notice or any consequential liability to you.
            </p>
            <p className="mt-2">
              5.3. While qdorehome.com strives to provide accurate information relating to products, services including pricing information, typographical and other errors may occur. In the event that a product or service is listed with incorrect price or with incorrect information due to an error, qdorehome.com may, at its discretion, contact you for instructions or cancel your order and notify you of such cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. CREDIT CARD DETAILS</h2>
            <p className="mt-2">
              You might be required to provide your credit or debit card details to the approved payment gateways while making the payment. In this regard you agree to provide correct and accurate credit/debit card details to the approved payment gateways for availing services on the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. DELIVERY OF THE PRODUCT</h2>
            <p className="mt-2">
              Your shipping address and pin code will be verified with the database of qdorehome.com before you proceed to pay for your purchase. If your order is not serviceable by delivery partners, vendors, or your location is not covered by us, we would request you to provide us with an alternate shipping address.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. RETURN & REFUND POLICY</h2>
            <p className="mt-2">
              Please see terms relating to returns & refunds on the website or on the following link: 
              
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. SHIPPING, DELIVERY AND PAYMENTS</h2>
            <p className="mt-2">
              Please see terms relating to shipping, delivery and cancellation on the website or on the following link: 
              
            </p>
          </section>

          <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. WARRANTIES AND CLAIMS</h2>
          <p className="text-gray-600 mb-2">
            Please note the standard warranties and the conditions for usage of the products in
            relation to each product. No claim (a) that is contrary to the above or (b) where
            products have been used contrary to the conditions of usage; will be entertained.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            11. INDEMNIFICATIONS AND LIMITATION OF LIABILITY
          </h2>
          <p className="text-gray-600 mb-2">
            11.1 You agree to indemnify, defend and hold harmless Qdore home from and
            against any and all losses, liabilities, claims, damages, demands, costs and expenses
            (including legal fees and disbursements in connection therewith and interest chargeable
            thereon) asserted against or incurred by Qdore home that arise out of, result
            from, or may be payable by virtue of, any breach of any representation, warranty,
            covenant or agreement made or obligation to be performed by you pursuant to these supply
            terms or any additional terms applicable to the purchase of products.
          </p>
          <p className="text-gray-600 mb-2">
            11.2 In no event shall Qdore home and its officers, directors, employees,
            partners or vendors be liable to you, the vendor or any third party for any special,
            incidental, indirect, consequential or punitive damages whatsoever, including those
            resulting from loss of use, data or profits, whether or not foreseeable or whether or
            not Qdore home has been advised of the possibility of such damages, or based
            on any theory of liability, including breach of contract or warranty, negligence or
            other tortious action, or any other claim arising out of or in connection with your
            purchase of the products and services herein. Notwithstanding anything to contrary, Qdore home entire liability to you under this Terms of Offer For Sale or otherwise
            shall be the refund of the money charged from you, under which the unlikely liability
            arises.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">12. GOVERNING LAW</h2>
          <p className="text-gray-600 mb-2">
            12.1 These Terms & Conditions and the relationship between you and Qdore home
            shall be governed in accordance with the laws of India without reference to conflict of
            laws principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            13. GENERAL TERMS FOR OFFERS, PROMOTIONS, CONTESTS
          </h2>
          <p className="text-gray-600 mb-2">
            13.1 qdorehome.com shall introduce various offers, promotions, contests from time to
            time. The terms and conditions for these shall be separately called out and qdorehome.com
            reserves right to change/ modify/ add/ delete any of terms and conditions on such
            contests or promotions at its discretion at any time without prior intimation.
          </p>
          <p className="text-gray-600 mb-2">
            13.2 While participating in such contests/ promotions, you hereby agree to release and
            hold qdorehome.com harmless from any claims or demand.
          </p>
          <p className="text-gray-600 mb-2">
            13.3 Winners to contests will be decided by the team at qdorehome.com and qdorehome.com
            is not obliged or required to disclose the mechanism of the same.
          </p>
          <p className="text-gray-600 mb-2">
            13.4 qdorehome.com reserves the right to vary any of the terms and conditions of the
            contest and the decision of qdorehome.com shall be valid and binding on the contestants.
          </p>
          <p className="text-gray-600 mb-2">
            13.5 All personal information collected, in the course of this contest shall be kept
            confidential. qdorehome.com shall use such information for communicating various
            marketing and promotional activities, subject to the contestant’s choice to receive such
            communications, while entering the contest.
          </p>
          <p className="text-gray-600 mb-2">
            13.6 The participant's profile must be public. Entries from private profiles can't be
            viewed and therefore will be considered invalid.
          </p>
          <p className="text-gray-600 mb-2">
            13.7 If @Qdore Home regrams or shares any participants photo that does not mean that
            participant is a winner. A participant will only be considered a winner once
            qdorehome.com explicitly declares the same.
          </p>
          <p className="text-gray-600 mb-2">
            13.8 Entries being featured on qdorehome.com's Instagram handle and Facebook page are
            entirely up to the discretion of qdorehome.com and third-party agency/agencies.
          </p>
          <p className="text-gray-600 mb-2">
            13.9 If any entry is found to have abusive and profane language, or an attempt to attack
            the integrity, personality of any individual or an entity or where there is any attempt
            to harass any individual or entity or doing/having anything which in our view is
            demeaning or derogatory, such entry shall stand disqualified and or deleted from the
            contest and content.
          </p>
          <p className="text-gray-600 mb-2">
            13.10 All other terms and conditions on the website www.qdorehome.com, not in conflict
            with these terms and conditions, shall prevail.
          </p>
          <p className="text-gray-600 mb-2">
            13.11 All dispute based on this contest is subject to arbitration and jurisdiction of
            all such dispute shall be within the Courts of Delhi.
          </p>
          <p className="text-gray-600 mb-2">
            13.12 This contest is void where prohibited by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">14. PRIORITY SHIPPING</h2>
          <p className="text-gray-600 mb-2">
            14.1 This is a service at an additional cost - costs vary based on the product and the
            pin-code where its needs to be shipped.
          </p>
          <p className="text-gray-600 mb-2">
            14.2 This is a service offered only on selected products and pin-code which can be
            confirmed by calling our Customer Service team on +91 7983131615.
          </p>
          <p className="text-gray-600 mb-2">
            14.3 In case of unlikely circumstances of a delay in the arrival of the package for
            reasons beyond our control, qdorehome.com will not be liable for the same.
          </p>
        </section>
          
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default TermsAndConditions;
