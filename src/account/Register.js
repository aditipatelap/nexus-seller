import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DataContext from '../context/DataContext';

const Register = () => {
  const navigate = useNavigate();
  const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";
  const { 
    setSellerId,
    sellerName, setSellerName,
    email, setEmail,
    password, setPassword,
    phoneNumber, setPhoneNumber,
    building, setBuilding,
    landmark, setLandmark,
    area, setArea,
    district, setDistrict,
    state, setState,
    setProductsList, setOrdersList,

  } = useContext(DataContext);

  const detailsBunch = [
    { id: "sellerName", value: sellerName, method: setSellerName, placeholder: "Name", type: "text" },
    { id: "email", value: email, method: setEmail, placeholder: "Email", type: "text" },
    { id: "password", value: password, method: setPassword, placeholder: "Password", type: "text" },
    { id: "phoneNumber", value: phoneNumber, method: setPhoneNumber, placeholder: "Phone Number", type: "text" },
    // address 
    { id: "building", value: building, method: setBuilding, placeholder: "Building no. & name", type: "text" },
    { id: "landmark", value: landmark, method: setLandmark, placeholder: "Landmark", type: "text" },
    { id: "area", value: area, method: setArea, placeholder: "Area/Street", type: "text" },
    { id: "state", value: state, method: setState, placeholder: "State", type: "select" },
    { id: "district", value: district, method: setDistrict, placeholder: "District", type: "select" },
  ];

  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha (Orissa)", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal",
    "Andaman & Nicobar (UT)", "Chandigarh (UT)",
    "Dadra & Nagar Haveli and Daman & Diu (UT)", "Delhi [National Capital Territory (NCT)]",
    "Jammu & Kashmir (UT)", "Ladakh (UT)", "Lakshadweep (UT)", "Puducherry (UT)"
  ];

  const districtsList = {
    // States
    "Andhra Pradesh": ["Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR [Nandamuri Taraka Rama Rao]", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R."],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    "Assam": ["Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Pashchim Champaran", "Patna", "Purba Champaran", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dakshin Bastar Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Khairagarh Chhuikhadan Gandai", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh Chirmiri Bharatpur Mcb", "Mohla Manpur Ambagarh Chouki", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", "Sarangarh Bilaigarh", "Sukma", "Surajpur", "Surguja", "Uttar Bastar Kanker"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmadabad", "Amreli", "Anand", "Aravalli", "Banas Kantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Devbhumi Dwarka", "Dohad", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahesana", "Mahisagar", "Morbi", "Narmada", "Navsari", "Panch Mahals", "Patan", "Porbandar", "Rajkot", "Sabar Kantha", "Surat", "Surendranagar", "Tapi", "The Dangs", "Vadodra", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahul & Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Kodarma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Pashchimi Singhbhum", "Purbi Singhbhum", "Ramgarh", "Ranchi", "Sahibganj", "Saraikela-kharsawan", "Simdega"],
    "Karnataka": ["Bagalkot", "Bangalore", "Bangalore Rural", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajanagar", "Chikkaballapura", "Chikmagalur", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Vijayanagar", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa (East Nimar)", "Khargone (West Nimar)", "Mandla", "Mandsaur", "Morena", "Narsimhapur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmadnagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Bid", "Buldana", "Chandrapur", "Dhule", "Gadchiroli", "Gondiya", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["Eastern West Khasi Hills", "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ribhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
    "Nagaland": ["Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyü", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha (Orissa)": ["Anugul", "Balangir", "Baleshwar", "Bargarh", "Baudh", "Bhadrak", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajapur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangapur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittaurgarh", "Churu", "Dausa", "Deeg", "Dhaulpur", "Didwana Kuchaman", "Dudu", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Gramin", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Gramin", "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchor", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"],
    "Sikkim": ["East District", "North District", "Pakyong", "Soreng", "South District", "West District"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "The Nilgiris", "Thiruvallur", "Thiruvarur", "Thoothukkudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sipahijala", "South Tripura", "Unokoti", "West Tripura"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Garhwal", "Hardwar", "Nainital", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Mahoba", "Mahrajganj", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjiling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North Twenty Four Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Puruliya", "South Twenty Four Parganas", "Uttar Dinajpur"],
    // Union Territories 
    "Andaman & Nicobar (UT)": ["Nicobar", "North & Middle Andaman", "South Andaman"],
    "Chandigarh (UT)": ["Chandigarh"],
    "Dadra & Nagar Haveli and Daman & Diu (UT)": ["Dadra & Nagar Haveli", "Daman", "Diu"],
    "Delhi [National Capital Territory (NCT)]": ["Central", "East", "New Delhi", "North", "North East", "North West", "Shahdara", "South", "South East", "South West", "West"],
    "Jammu & Kashmir (UT)": ["Anantnag", "Badgam", "Bandipore", "Baramula", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Pulwama", "Punch", "Rajouri", "Ramban", "Reasi", "Samba", "Shupiyan", "Srinagar", "Udhampur"],
    "Ladakh (UT)": ["Kargil", "Leh"],
    "Lakshadweep (UT)": ["Amini", "Andrott", "Kavaratti", "Minicoy"],
    "Puducherry (UT)": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  };

  const handleSellerData = (seller) => {
    setSellerId(seller._id);
    setSellerName(seller.name);
    setEmail(seller.email);
    setPassword(seller.password);
    setPhoneNumber(seller.phoneNumber);
    setBuilding(seller.building);
    setLandmark(seller.landmark);
    setArea(seller.area);
    setDistrict(seller.district);
    setState(seller.state);
    setProductsList(seller.productsList);
    setOrdersList(seller.ordersList);
  }

  const handleRegister = async () => {
    const data = { sellerName, email, password, phoneNumber, building, landmark, area, district, state };
    try {
        const response = await axios.post("https://nexus-backend-380o.onrender.com/seller/register", data);
        if(response.data.status === "added") {
            alert("Thank you for registering");
            handleSellerData(response.data.user);
            navigate("/home/products");
        }
        else if (response.data.status === "fail") {
            alert("Something went wrong");
        }
    }
    catch (error) {
        console.error(error);
    }
  }

  return (
    <div className='flex flex-col m-5'>
      {/* logo */}
      <div className="w-full flex justify-center">
          <div className="mb-8 h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
              <img src={logoPath} alt="Nexus" className="h-full w-full object-contain" />
          </div>
      </div>
      {/* pickup line */}
      <p className="font-balsamiq-sans font-semibold text-center text-xl mb-8 w-full">
          We love to join with you. Please, fill the below details.
      </p>
      <form id="registerPage" action="POST" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full px-5">
            {/* details  */}
            {detailsBunch.map((detail) => (
                <div key={detail.id} className="w-full">
                  {/* put address text before address field */}
                  {detail.id === "building" &&
                    <p className="font-bold md:text-sm sm:text-sm xs:text-xs mb-2">Address:</p>
                  }
                  {/* show the details based on their type */}
                  <div className="flex flex-row mb-6 md:text-sm sm:text-sm xs:text-xs">
                    <div className="w-full ml-2">
                      {detail.type === "select" &&
                        <div>
                          <p className="w-full mb-2">{detail.placeholder}:</p>
                          <select
                            id={detail.id}
                            value={detail.value}
                            required
                            className="border-2 rounded-md border-gray-300 px-2"
                            onChange={(e) => detail.method(e.target.value)}
                            style={{ width: '100%', maxWidth: '100%' }}
                          >
                            {detail.id === "state" &&
                              statesList.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))
                            }

                            {detail.id === "district" &&
                              districtsList[state].map((district) => (
                                <option key={district} value={district}>{district}</option>
                              ))
                            }
                          </select>
                        </div>
                      }
                      {detail.type === "text" &&
                        <input
                          id={detail.id}
                          type={detail.type}
                          required
                          placeholder={detail.placeholder}
                          autoFocus={detail.id === "sellerName"}
                          autoComplete={detail.id === "email" || detail.id === "password" ? "off" : "on"}
                          className="border-b-2 border-gray-300 px-2 w-full"
                          value={detail.value}
                          onChange={(e) => detail.id !== "email" && detail.method(e.target.value)}
                        />
                      }
                    </div>
                  </div>

                </div>
            ))}
        </div>

        {/* button  */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-podkova bg-[#285F88] rounded-md p-4 px-10 sm:px-6 xs:px-6 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
            onClick={() => handleRegister()}
          >
            LET's GO
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
