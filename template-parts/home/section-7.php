<div id="section7" class="section-container section-7 position-relative bg-dark text-light w-100 vh-md-100 px-site py-5 d-flex flex-column justify-content-center align-items-start">
    <div class="section-intro mb-5">
        <h2 class="section-heading"><?php _e( 'Contact us', 'btr' ); ?></h2>
    </div>
    <div class="section-content w-100">
        <div class="row">
            <div class="col-md-9 mb-md-0 mb-5">
                <form id="contact-form" name="contact-form" action="javascript:void(0);" method="post">
                    <div class="row mb-2">
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="name" name="name" class="form-control">
                                <label for="name" class=""><?php _e( 'Your name', 'btr' ); ?></label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="email" name="email" class="form-control">
                                <label for="email" class=""><?php _e( 'Your email', 'btr' ); ?></label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <input type="text" id="otp" name="otp" class="form-control">
                                <label for="otp" class=""><?php _e( 'Your OTP', 'btr' ); ?></label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div class="md-form">
                                <textarea type="text" id="message" name="message" rows="2"
                                    class="form-control md-textarea"></textarea>
                                <label for="message"><?php _e( 'Your message', 'btr' ); ?></label>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="text-md-left mt-4">
                    <a class="btn btn-primary" onclick="document.getElementById('contact-form').submit();"><?php _e( 'Send', 'btr' ); ?></a>
                </div>
                <div class="status"></div>
            </div>
            <div class="col-md-3 text-center">
                <ul class="list-unstyled mb-0">
                    <li><i class="fas fa-map-marker-alt fa-2x"></i>
                        <p><?php echo btr_get_contact_address(); ?></p>
                    </li>
                    <li><i class="fas fa-phone mt-4 fa-2x"></i>
                    <p><?php echo btr_get_contact_phone(); ?></p>
                    </li>
                    <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                        <p><?php echo btr_get_contact_email(); ?></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>