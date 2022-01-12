import React, { useState, useEffect } from "react";
import ContactImage from '../../../asset/images/contact-tour.jpeg'
import ContactAPI from '../../../API/ContactAPI';

export default function ComponentContactInfo(props) {
    const [allContact, setAllContact] = useState([])

    const getAllContact = async () => {
        try {
            const contactRes = await ContactAPI.getAll()

            if (contactRes.data && contactRes.data.success) {
                setAllContact(contactRes.data.payload)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllContact()
    }, [])

    return (
        <div id="fh5co-contact-section">
            <div className="row">
                <div className="col-md-6">
                    <img src={ContactImage} style={{ width: '100%' }} />
                </div>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h3>THÔNG TIN LIÊN HỆ CỦA CHÚNG TÔI</h3>
                        <p>Chúng tôi luôn cố gắng đem lại cho bạn trải nghiệm dịch vụ tốt nhất</p>
                        {allContact.map((contactItem, contactIndex) => {
                            return (
                                <ul className="contact-info" key={`list-contact-${contactIndex}`} style={{marginTop: '20px'}}>
                                    <li><i className="ti-map" />{contactItem.contact_address}</li>
                                    <li><i className="ti-mobile" />{contactItem.contact_phone}</li>
                                    <li><i className="ti-envelope" />{contactItem.contact_email}</li>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}