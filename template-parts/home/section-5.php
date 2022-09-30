<div id="section5" class="section-container section-5 bg-light text-dark w-100 vh-100 px-site py-5 d-flex flex-column justify-content-center align-items-center">
    <div class="section-intro mb-5">
        <h1 class="section-heading">Contact us</h1>
    </div>
    <div class="section-content w-100">
        <div class="row">
            <div class="col-md-9 mb-md-0 mb-5">
                <form id="contact-form" name="contact-form" action="javascript:void(0);" method="post">
                    <div class="row mb-2">
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="name" name="name" class="form-control">
                                <label for="name" class="">Your name</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="email" name="email" class="form-control">
                                <label for="email" class="">Your email</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <input type="text" id="subject" name="subject" class="form-control">
                                <label for="subject" class="">Subject</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div class="md-form">
                                <textarea type="text" id="message" name="message" rows="2"
                                    class="form-control md-textarea"></textarea>
                                <label for="message">Your message</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="text-md-left mt-4">
                    <a class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
                </div>
                <div class="status"></div>
            </div>
            <div class="col-md-3 text-center">
                <ul class="list-unstyled mb-0">
                    <li><i class="fas fa-map-marker-alt fa-2x"></i>
                        <p>123 ABCD, XYZ 0000, Lorem</p>
                    </li>
                    <li><i class="fas fa-phone mt-4 fa-2x"></i>
                        <p>+ xx xxx xxx xx</p>
                    </li>
                    <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                        <p>contact@demo.com</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>