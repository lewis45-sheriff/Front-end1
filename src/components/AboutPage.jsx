import React from 'react';
import './AboutPage.css'; // Import the stylesheet for the About Page

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className='about-h1'>Welcome to Atlas Liquor Store</h1>
      <p>
        At Atlas Liquor Store, we pride ourselves on being your go-to destination for both retail and wholesale liquor. Our extensive selection includes a variety of spirits, beers, and wines to cater to every palate and occasion. 
      </p>
      <img className="recomm"
        src ="https://i.pinimg.com/236x/52/86/c3/5286c39dd3fcec5e3b7e4c3cf4bc22ef.jpg" alt="liquor selection"/>
      
      <div className="section">
        <div className="text">
          <h2>Discover the Perfect Liquor for Any Occasion</h2>
          <p>
            Whether you're hosting a gathering, celebrating a special event, or simply enjoying a quiet evening at home, finding the right liquor can make all the difference. At Atlas Liquor Store, we are dedicated to helping you discover the ideal beverages to suit your needs, offering expert advice and recommendations along the way.
          </p>
        </div>
        <div className="pair-image">
          <img src="https://i.pinimg.com/564x/b8/22/8e/b8228e303edc5047ef03c62028fb294d.jpg" alt="pairing liquor" />
        </div>
      </div>
      
      <div className="section">
        <div className="text">
          <h2>Your One-Stop Shop for Liquor</h2>
          <p>
            Atlas Liquor Store provides a comprehensive selection of liquors, including:
          </p>
          <ul>
            <li><strong>Premium spirits:</strong> vodka, gin, rum, whiskey, and more.</li>
            <li>Quality wines from around the world.</li>
            <li>Varieties of beers and craft brews.</li>
            <li>Wholesale options for businesses and events.</li>
          </ul>
          <p>
            Our knowledgeable staff is always available to assist you in finding the perfect choice, whether you're buying for personal enjoyment or for larger gatherings.
          </p>
        </div>
      </div>
      
      
      

      {/* Location Section */}
      <h2>Our Location</h2>
      <p>Visit us at:</p>
      <address>
        Atlas Liquor Store<br />
        Zimmerman, Base Road
      </address>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15932.34422313216!2d35.12097031673775!3d-0.3972311175368763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1841aa1d45de2a69%3A0x1d84b0bc0c5a94e8!2sAtlas%20Liquor%20Store!5e0!3m2!1sen!2ske!4v1698001033137!5m2!1sen!2ske"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map to Atlas Liquor Store"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutPage;
