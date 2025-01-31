const EmailTemplte = (email, ip, time) => {
 return `  <div class="container mt-4">
   <div class="text-center">
    <img alt="" class="img-fluid" src="https://placehold.co/150x50?text=MongoDB+Logo"/>
   </div>
   <div class="mt-4">
    <p>
     We're verifying a recent sign-in for
     <a>
      ${email}
     </a>
     :
    </p>
    <p>
     <strong>
      Timestamp:
     </strong>
        ${time}
    </p>
    <p>
     <strong>
      IP Address:
     </strong>
   ${ip}
    </p>
    <p>
     You're receiving this message because of a successful sign-in from a device that we didn’t recognize.
     <strong>
      If you believe that this sign-in is suspicious,
      <a href="#">
       please reset your password immediately
      </a>
      .
     </strong>
    </p>
    <p>
     If you're aware of this sign-in, please disregard this notice. This can happen when you use your browser's incognito or private browsing mode or clear your cookies.
    </p>
    <p>
     Thanks,
    </p>
    <p>
     ClassRoom Team
    </p>
   </div>
  </div>`;
};

export default EmailTemplte;
